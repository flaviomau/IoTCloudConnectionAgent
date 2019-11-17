const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();
const server = {
  address: 'localhost',
  port: '1234'
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
  client.connect(`ws://${server.address}:${server.port}/`, 'echo-protocol', 'edgeGateway');
}

function sendSensorValue(connection, sensor) {
  if (connection.connected) {
    const {id, provider} = sensor;
    const type = 0;
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

startClient();
