const fs = require('fs');
const jwt  = require('jsonwebtoken');
const mqtt = require('mqtt');

const config = {
  registryId: 'mobodexter',
  deviceId: 'Humidity',
  tokenExpMins: '',
  projectId: 'vanhackathon-mobodexter-259222',
  privateKeyFile: __dirname + '/rsa_private.pem',
  algorithm: 'RS256',
  region: 'us-central1',
  mqttBridgeHostname: 'mqtt.googleapis.com',
  mqttBridgePort: 8883,
  messageType: 'events'
};

const MINIMUM_BACKOFF_TIME = 1;
const MAXIMUM_BACKOFF_TIME = 32;
let shouldBackoff = false;
let backoffTime = 1;

console.log('Google Cloud IoT Core MQTT');

const createJwt = (projectId, privateKeyFile, algorithm) => {
  const token = {
    iat: parseInt(Date.now() / 1000),
    exp: parseInt(Date.now() / 1000) + 20 * 60, // 20 minutes
    aud: projectId,
  };
  const privateKey = fs.readFileSync(privateKeyFile);
  return jwt.sign(token, privateKey, {algorithm: algorithm});
};

const publishAsync = (
  mqttTopic,
  client,
  payload
) => {
  if (backoffTime >= MAXIMUM_BACKOFF_TIME) {
    if (backoffTime >= MAXIMUM_BACKOFF_TIME) {
      console.log('Backoff time is too high. Giving up.');
    }
    console.log('Closing connection to MQTT. Goodbye!');
    client.end();
    return;
  }

  let publishDelayMs = 0;
  if (shouldBackoff) {
    publishDelayMs = 1000 * (backoffTime + Math.random());
    backoffTime *= 2;
  }

  setTimeout(() => {
    client.publish(mqttTopic, JSON.stringify(payload), {qos: 1}, err => {
      if (!err) {
        shouldBackoff = false;
        backoffTime = MINIMUM_BACKOFF_TIME;
        console.log('GOOGLE CLOUD IOT MESSAGE PUBLISHED')
        client.end();
      }else {
        console.log('PUB ERROR: ', err)
      }
    });    
  }, publishDelayMs);
};

const mqttDeviceDemo = (
  deviceId,
  registryId,
  projectId,
  region,
  algorithm,
  privateKeyFile,
  mqttBridgeHostname,
  mqttBridgePort,
  messageType,
  data
) => {
  const mqttClientId = `projects/${projectId}/locations/${region}/registries/${registryId}/devices/${deviceId}`;
  const connectionArgs = {
    host: mqttBridgeHostname,
    port: mqttBridgePort,
    clientId: mqttClientId,
    username: 'unused',
    password: createJwt(projectId, privateKeyFile, algorithm),
    protocol: 'mqtts',
    secureProtocol: 'TLSv1_2_method',
  };

  const client = mqtt.connect(connectionArgs);
  client.subscribe(`/devices/${deviceId}/config`, {qos: 1});
  client.subscribe(`/devices/${deviceId}/commands/#`, {qos: 0});
  const mqttTopic = `/devices/${deviceId}/${messageType}`;

  client.on('connect', success => {
    console.log('connect');
    if (!success) {
      console.log('Client not connected...');
    } else {
      publishAsync(mqttTopic, client, data);
    }
  });

  client.on('close', () => {
    console.log('close');
    shouldBackoff = true;
  });

  client.on('error', err => {
    console.log('error', err);
  });

  client.on('message', (topic, message) => {
    let messageStr = 'Message received: ';
    if (topic === `/devices/${deviceId}/config`) {
      messageStr = 'Config message received: ';
    } else if (topic.startsWith(`/devices/${deviceId}/commands`)) {
      messageStr = 'Command message received: ';
    }

    messageStr += Buffer.from(message, 'base64').toString('ascii');
    console.log(messageStr);
  });

  client.on('packetsend', () => {
    // Note: logging packet send is very verbose
  });
};

const process = (data) => {
  console.log(`processing data to GOOGLE`);
  try{
    mqttDeviceDemo(config.deviceId, 
      config.registryId, 
      config.projectId, 
      config.region, 
      config.algorithm, 
      config.privateKeyFile,
      config.mqttBridgeHostname,
      config.mqttBridgePort,
      config.messageType,
      data
    );
  }catch(err){
    console.log('GOOGLE ERROR: ', err);
  }
}

const send = (data) => {
  console.log(`sending data to GOOGLE`);
}

const configure = (config) => {
  console.log(`configuring data to GOOGLE`);
}

module.exports = { process, send, configure };