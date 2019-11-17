const iotHubTransport = require('azure-iot-device-mqtt').Mqtt;
const Client = require('azure-iot-device').Client;
const Message = require('azure-iot-device').Message;
const ProvisioningTransport = require('azure-iot-provisioning-device-mqtt').Mqtt;
const SymmetricKeySecurityClient = require('azure-iot-security-symmetric-key').SymmetricKeySecurityClient;
const ProvisioningDeviceClient = require('azure-iot-provisioning-device').ProvisioningDeviceClient;

const provisioningHost = 'global.azure-devices-provisioning.net';
const idScope = '0ne000954EE';
const registrationId = '1da61abd-de6e-4715-b4ae-ae83a10e112d';
const symmetricKey = 'Q5nG6Dk5xoVlPzt/XveUvUj5o2boRGiuYMthEmfHM2c=';
const provisioningSecurityClient = new SymmetricKeySecurityClient(registrationId, symmetricKey);
const provisioningClient = ProvisioningDeviceClient.create(provisioningHost, idScope, new ProvisioningTransport(), provisioningSecurityClient);
let hubClient;

let connected = false;

function sendTelemetry(data) {
  if (connected) {
    const json = JSON.stringify({
      data
    });
    const message = new Message(json);
    hubClient.sendEvent(message, (err, res) => console.log(`Sent message: ${message.getData()}` +
      (err ? `; error: ${err.toString()}` : '') +
      (res ? `; status: ${res.constructor.name}` : '')));
  }
}

const connectCallback = (err) => {
  if (err) {
    console.log(`Device could not connect to Azure IoT Central: ${err.toString()}`);
    connected = false;
  } else {
    console.log('Device successfully connected to Azure IoT Central');
    connected = true;
  }
};

provisioningClient.register((err, result) => {
  if (err) {
    console.log('Error registering device: ' + err);
  } else {
    console.log('Registration succeeded');
    console.log('Assigned hub=' + result.assignedHub);
    console.log('DeviceId=' + result.deviceId);
    const connectionString = 'HostName=' + result.assignedHub + ';DeviceId=' + result.deviceId + ';SharedAccessKey=' + symmetricKey;
    hubClient = Client.fromConnectionString(connectionString, iotHubTransport);

    hubClient.open(connectCallback);
  }
});

const process = (data) => {
  console.log(`processing data to AZURE`);
  sendTelemetry(data);
}

const send = (data) => {
  console.log(`sending data to AZURE`);
}

const configure = (config) => {
  console.log(`configuring data to AZURE`);
}

module.exports = { process, send, configure };