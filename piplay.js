'use strict';

const net = require('net');
const AirTunes = require('nodetunes');
const pkg = require('./package.json');

const airtunesInstance = new AirTunes({ serverName: 'PiPlay' });

let inputSocket;
let outputSocket;
let clients = [];

airtunesInstance.on('clientConnected', function(stream) {
  stream.on('data', (d) => {
    clients.forEach((clientSocket) => {
      clientSocket.write(d);
    });
  });
});

net.createServer((socket) => {

  socket.name = socket.remoteAddress + ":" + socket.remotePort
  console.log(`${socket.name} connected`);

  clients.push(socket);

  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    console.log(`${socket.name} disconnected`);
  });

}).listen(3001);

airtunesInstance.start();
