const process = (data) => {
  console.log(`processing data to AWS`);
}

const send = (data) => {
  console.log(`sending data to AWS`);
}

const configure = (config) => {
  console.log(`configuring data to AWS`);
}

module.exports = { process, send, configure };