const process = (data) => {
    console.log(`processing data to GOOGLE`);
}

const send = (data) => {
    console.log(`sending data to GOOGLE`);
}

const configure = (config) => {
    console.log(`configuring data to GOOGLE`);
}

exports.defaut  = {process, send, configure};