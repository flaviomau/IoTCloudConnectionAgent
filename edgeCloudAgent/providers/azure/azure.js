const process = (data) => {
    console.log(`processing data to AZURE`);
}

const send = (data) => {
    console.log(`sending data to AZURE`);
}

const configure = (config) => {
    console.log(`configuring data to AZURE`);
}

module.exports = { process, send, configure };