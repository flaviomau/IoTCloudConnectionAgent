const express = require('express');
const path = require('path');
const app = express();

let inputs = [{
  id: '1348',
  name: 'Temperature',
  interval: '7000',
  max_value: '255',
  provider: 'AWS'
}, {
  id: '2847',
  name: 'Humidity',
  interval: '5000',
  max_value: '128',
  provider: 'GOOGLE'
}, {
  id: '7845',
  name: 'Wind',
  interval: '7000',
  max_value: '255',
  provider: 'AZURE'
}];

const providers = [{
  name: 'AWS',
  keyPath: '',
  certPath: '',
  caPath: '',
  clientId: '',
  host: ''
}, {
  name: 'AZURE',
  provisioningHost: '',
  idScope: '',
  registrationId: '',
  symmetricKey: ''
}, {
  name: 'GOOGLE',
  registryId: '',
  deviceId: '',
  projectId: '',
  privateKeyFile: '',
  algorithm: '',
  region: '',
  mqttBridgeHostname: '',
  mqttBridgePort: '',
  messageType: ''
}];

app.use(express.static(path.join(__dirname, 'edge-gateway-config/build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'edge-gateway-config/build', 'index.html'));
});

app.get('/inputs', (req, res) => {
  res.send({ inputs });
});

app.get('/providers', (req, res) => {
  res.send({ providers });
});

app.get('/inputs/:id', (req, res) => {
  const input = inputs.filter(e => {
    return e.id === req.params.id
  })
  if (input.length === 1)
    res.send(input[0]);
  else
    res.send({});
});

app.get('/providers/:name', (req, res) => {
  const provider = providers.filter(e => {
    return e.name === req.params.name
  })
  if (provider.length === 1)
    res.send(provider[0]);
  else
    res.send({});
});

app.post('/providers', (req, res) => {
  res.send({success: true});
});

app.post('/inputs', (req, res) => {
  res.send({success: true});
});

app.put('/inputs/:id', (req, res) => {
  res.send({success: true});
});

module.exports = app;