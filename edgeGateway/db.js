const fs = require('fs');

let cache = {
  itens: [],
  providers: []
}

const databaseName = 'database.json';

function promiseRead() {
  return new Promise((resolve, reject) => {
    fs.readFile(databaseName, (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
}

function promiseWrite () {
  return new Promise((resolve, reject) => {
    fs.writeFile(databaseName, JSON.stringify(cache), (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
}

const readData = async () => {
  try {
    cache = await promiseRead();
  } catch (err) {
    cache = {};
  }
}

const writeData = async () => {
  try {
    await promiseWrite();
  } catch (err) {
    cache = {};
  }
}

exports.readAll = async (table) => {
  if (cache.hasOwnProperty(table)) {
    if (cache[table].length === 0){
      await readData();
    }
    return cache[table];
  } else {
    throw Error('table not found');
  }
}

exports.readOne = async (table, key, value) => {
  if (cache.hasOwnProperty(table)) {
    if (cache[table].length === 0)
      await readData();      
    const list = cache[table].filter(e => {
      console.log(e[key],value,e[key] === value)
      return e[key] === value
    })
    if (list.length === 1){
      return list[0];
    } else{
      throw Error('register not found');
    }      
  } else {
    throw Error('table not found');
  }
}

exports.insertOne = async (table, item) => {   
  if (cache.hasOwnProperty(table)) {
    if (cache[table].length === 0)
      await readData();
    cache[table].push(item);
    await writeData();
    return { sucess: true }
  } else {
    throw Error('table not found');
  }
}

exports.editOne = async (table, key, value, item) => {
  if (cache.hasOwnProperty(table)) {
    if (cache[table].length === 0)
      await readData();

    const index = cache[table].findIndex(e => {
      return e[key] === value
    }) 
    
    if (index > -1) {
      cache[table][index] = item;
      await writeData();
      return { sucess: true };
    } else {
      throw Error('register not found');
    }
  } else {
    throw Error('table not found');
  }
}

exports.deleteOne = async (table, key, value) => {
  if (cache.hasOwnProperty(table)) {
    if (cache[table].length === 0)
      await readData();
    const list = cache[table].filter(e => {
      return e[key] !== value
    })
    if (list.length === cache[table].length - 1) {
      cache[table] = list;
      await writeData();
      return { sucess: true };
    } else {
      throw Error('register not found');
    }
  } else {
    throw Error('table not found');
  }
}
