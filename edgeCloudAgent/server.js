import { queues, AWS_CLOUD_PROVIDER, GOOGLE_CLOUD_PROVIDER, AZURE_CLOUD_PROVIDER} from './queues';
import { server } from 'websocket';
import * as http from 'http';

const providers = {
  0: AWS_CLOUD_PROVIDER,
  1: GOOGLE_CLOUD_PROVIDER,
  2:AZURE_CLOUD_PROVIDER
}

const WebSocketServer = server;
const port = '1234';
const origins = ['edgeGateway'];

const httpServer = http.createServer(function (request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});

httpServer.listen(port, function () {
  console.log((new Date()) + `Server is listening on port ${port}`);
});

const wsServer = new WebSocketServer({
  httpServer,
  autoAcceptConnections: false
});

function originIsAllowed(origin) {
  if(origins.includes(origin))
    return true;
  return false;
}

wsServer.on('request', function (request) {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }

  const connection = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection accepted.');
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      const info = JSON.parse(message.utf8Data);
      console.log('Received Message: ', info);
      if(info.type === 'config'){
        reconfigProvider(info.provider, info.data);
      } else {
        //queues[providers[info.provider]].add(info.data, {removeOnComplete: true});
      }      
      connection.sendUTF('ACK');
    }
    else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on('close', function (reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});

function reconfigProvider(provider, data){
  console.log('New config receiced to provider: ', provider, 'data: ', data);
  console.log('FEATURE WILL BE IMPLEMENTED IN NEXT RELEASE. 8(')
}