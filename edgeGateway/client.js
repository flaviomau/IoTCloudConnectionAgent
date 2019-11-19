const WebSocketClient = require('websocket').client;
const server = require('./server');
const client = new WebSocketClient();

const config = {
  address: 'localhost',
  port: '1234',
  webAppPort: process.env.PORT || 5000 
}

const providers = {
  AWS: 0,
  GOOGLE: 1,
  AZURE: 2
}

const sensors = {
  TEMPERATURE: {id: 1348, provider: providers.AWS, timeout: 7000},
  HUMIDITY: {id: 2847, provider: providers.GOOGLE, timeout: 5000},
  WIND: {id: 7845, provider: providers.AZURE, timeout: 3000},
}

let intervals = [];

client.on('connectFailed', function (error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection) {
  console.log('WebSocket Client Connected');
  conn = connection;
  startSensor(connection, sensors.WIND);
  startSensor(connection, sensors.TEMPERATURE);
  startSensor(connection, sensors.HUMIDITY);
  connection.on('error', function (error) {
    console.log("Connection Error: " + error.toString());
    stopSensors();
  });
  connection.on('close', function () {
    console.log('echo-protocol Connection Closed');
    stopSensors();
    setTimeout(startClient, 5000);
  });
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log("Received: '" + message.utf8Data + "'");
    }
  });
});

client.on('connectFailed', function (errorDescription) {
  stopSensors();
  setTimeout(startClient, 5000);
})

function startClient() {
  client.connect(`ws://${config.address}:${config.port}/`, 'echo-protocol', 'edgeGateway');
}

function sendSensorValue(connection, sensor) {
  if (connection.connected) {
    const {id, provider} = sensor;
    const type = 'data';
    const pack = {
      id,
      provider,
      type,
      data: Math.round(Math.random() * 0xF)
    }
    connection.sendUTF(JSON.stringify(pack));
  }
}

function startSensor(connection, sensor){
  const interval = setInterval(()=>{
    sendSensorValue(connection, sensor);
  }, sensor.timeout);
  intervals.push(interval);
};

function stopSensors(){
  intervals.forEach(interval => {
    clearInterval(interval)
  });
}

server.emitter.on('update', (info) => {
  if(conn.connected){
    conn.sendUTF(JSON.stringify(info));
  }
});

startClient();
server.app.listen(config.webAppPort, () => console.log(`Listening on port ${config.webAppPort}`));