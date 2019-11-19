const express = require('express');
const path = require('path');
const db = require('./db');
const bodyParser = require('body-parser');
const EventEmitter = require('events');
const emitter = new EventEmitter();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'edge-gateway-config/build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'edge-gateway-config/build', 'index.html'));
});

app.get('/itens', async(req, res) => {
  try{
    itens = await db.readAll('itens');
    res.status(200).send({ itens });
  }catch(err){
    res.status(500).send({ success: false }); 
  }
});

app.get('/providers', async(req, res) => {
  try{
    providers = await db.readAll('providers');    
    res.status(200).send({ providers });
  }catch(err){
    res.status(500).send({ success: false }); 
  }
});

app.get('/itens/:id', async(req, res) => {
  const id = req.params.id;
  try{
    const item = await db.readOne('itens', 'id', id);
    res.status(200).send(item);
  }catch(err){
    res.status(500).send({ success: false }); 
  }
});

app.get('/providers/:name', async(req, res) => {
  const name = req.params.name;
  try{
    const provider = await db.readOne('providers', 'name', name);
    res.status(200).send(provider);
  }catch(err){
    res.status(500).send({ success: false }); 
  }  
});

app.post('/itens', async(req, res) => {
  const body = req.body;
  try{
    await db.insertOne('itens', body);
    res.status(200).send({ success: true });
  }catch(err){
    res.status(500).send({ success: false }); 
  }
});

app.put('/itens/:id', async(req, res) => {
  const body = req.body;
  const id = req.params.id;
  try{
    await db.editOne('itens', 'id', id, body);
    res.status(200).send({ success: true });
  }catch(err){
    res.status(500).send({ success: false }); 
  }
});

app.put('/providers/:name', async(req, res) => {
  const body = req.body;
  const name = req.params.name;
  try{
    await db.editOne('providers', 'name', name, body);
    emitter.emit('update', {
      provider: name,
      type: 'config',
      data: body
    });
    res.status(200).send({ success: true });
  }catch(err){
    console.log(err)
    res.status(500).send({ success: false }); 
  }
});

app.delete('/itens/:id', async(req, res) => {
  const id = req.params.id;
  try{
    await db.deleteOne('itens', 'id', id);
    res.status(200).send({ success: true });
  }catch(err){
    res.status(500).send({ success: false }); 
  }  
});

module.exports = { app, emitter };