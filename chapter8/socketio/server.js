var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/app.js', function(req, res) {
  res.sendfile(__dirname + '/app.js');
});

io.sockets.on('connection', function (socket) {
  socket.emit('new:msg', 'Welcome to AnonBoard');

  socket.on('broadcast:msg', function(data) {
    // Tell all the other clients (except self) about the new message
    socket.broadcast.emit('new:msg', data.message);
  });
});
