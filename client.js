const net = require('net');
const Speaker = require('speaker');
const filter = require('through2-filter');
const BufferStream = require('bufferstream');

// Create the Speaker instance
var speakerInstance = new Speaker({
  channels: 2,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100     // 44,100 Hz sample rate
});

var HOST = '127.0.0.1';
var PORT = 3001;

var client = new net.Socket();
var pcmBuffer = new BufferStream();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client
      .pipe(pcmBuffer)
      .pipe(speakerInstance);

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
