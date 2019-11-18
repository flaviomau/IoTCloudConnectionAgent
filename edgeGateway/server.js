const express = require('express');
const path = require('path');
const app = express();
//const port = process.env.PORT || 5000;
//app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static(path.join(__dirname, 'edge-gateway-config/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'edge-gateway-config/build', 'index.html'));
});

app.get('/getInputs', (req, res) => {
  const inputs = [{
    id: 1348,
    name: 'Temperature',
    interval: '7000',
    max_value: '255',
    provider: {
      name: 'AWS'
    }
  },{
    id: 2847,
    name: 'Humidity',
    interval: '5000',
    max_value: '128',
    provider: {
      name: 'GOOGLE'
    }
  },{
    id: 7845,
    name: 'Wind',
    interval: '7000',
    max_value: '255',
    provider: {
      name: 'AZURE'
    }
  }];
  res.send({ inputs });
});

module.exports = app;