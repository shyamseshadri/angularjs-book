var app = require('express')()
  , server = require('http').createServer(app);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/app.js', function(req, res) {
  res.sendfile(__dirname + '/app.js');
});

app.get('/pagination.js', function(req, res) {
  res.sendfile(__dirname + '/pagination.js');
});

app.get('/search', function(req, res) {
  var query = req.query['query'];
  var offset = req.query['offset'] * 1;
  var limit = req.query['limit'] * 1;
  var items = [];
  for (var i = 0; i < limit; i++) {
    items.push('Item for ' + query + ' ' + (offset + i));
  }
  res.send(items);
});
