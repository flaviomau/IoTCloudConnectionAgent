const awsIot = require('aws-iot-device-sdk');
let connected = false;
const device = awsIot.device({
   keyPath: __dirname + '/5aa7482d7b-private.pem.key',
  certPath: __dirname + '/5aa7482d7b-certificate.pem.crt',
    caPath: __dirname + '/Amazon_Root_CA_1.pem',
  clientId: 'Temperature',
      host: 'a1o75ar5db2e1a-ats.iot.us-east-2.amazonaws.com'
});

device
  .on('connect', function() {
    console.log('connect');
    connected = true;
    device.subscribe('aws_message');    
  });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });

device.on('disconnect', function(){
  console.log('disconect');
  connected = false;
})
  
const process = (data) => {
  console.log(`processing data to AWS`);
  device.publish('events', JSON.stringify({ data}));
}

const send = (data) => {
  console.log(`sending data to AWS`);
}

const configure = (config) => {
  console.log(`configuring data to AWS`);
}

module.exports = { process, send, configure };