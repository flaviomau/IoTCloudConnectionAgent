const process = (data) => {
  console.log(`processing data to AWS`);
}

const send = (data) => {
  console.log(`sending data to AZURE`);
}

const configure = (config) => {
  console.log(`configuring data to AZURE`);
}

exports.defaut  = {process, send, configure};