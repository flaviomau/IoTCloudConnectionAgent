const express = require('express');
const path = require('path');
const app = express();

let inputs = [{
  general: {
    id: '1348',
    name: 'Temperature',
    interval: '7000', 
    max_value: '255',
    provider: 'AWS'
  },
  aws: {
    keyPath: '',
    certPath: '',
    caPath: '',
    clientId: '',
    host: ''
  }, 
  azure: {
    provisioningHost: '',
    idScope: '',
    registrationId: '',
    symmetricKey: ''
  }, 
  google: {
    registryId: '',
    deviceId: '',
    projectId: '',
    privateKeyFile: '',
    algorithm: '',
    region: '',
    mqttBridgeHostname: '',
    mqttBridgePort: '',
    messageType: ''
  }
},{
  general: {
    id: '2847',
    name: 'Humidity',
    interval: '5000',
    max_value: '128',
    provider: 'GOOGLE'
  },
  aws: {
    keyPath: '',
    certPath: '',
    caPath: '',
    clientId: '',
    host: ''
  }, 
  azure: {
    provisioningHost: '',
    idScope: '',
    registrationId: '',
    symmetricKey: ''
  }, 
  google: {
    registryId: '',
    deviceId: '',
    projectId: '',
    privateKeyFile: '',
    algorithm: '',
    region: '',
    mqttBridgeHostname: '',
    mqttBridgePort: '',
    messageType: ''
  }
},{
  general: {
    id: '7845',
    name: 'Wind',
    interval: '7000',
    max_value: '255',
    provider: 'AZURE'
  },
  aws: {
    keyPath: '',
    certPath: '',
    caPath: '',
    clientId: '',
    host: ''
  }, 
  azure: {
    provisioningHost: '',
    idScope: '',
    registrationId: '',
    symmetricKey: ''
  }, 
  google: {
    registryId: '',
    deviceId: '',
    projectId: '',
    privateKeyFile: '',
    algorithm: '',
    region: '',
    mqttBridgeHostname: '',
    mqttBridgePort: '',
    messageType: ''
  }
}];

app.use(express.static(path.join(__dirname, 'edge-gateway-config/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'edge-gateway-config/build', 'index.html'));
});

app.get('/getInputs', (req, res) => {  
  res.send({ inputs });
});

app.get('/getInput/:id', (req, res) => {
  const input = inputs.filter(e => {
    return e.general.id === req.params.id
  })
  if(input.length === 1)
    res.send(input[0]);
  else
  res.send({});
});

module.exports = app;