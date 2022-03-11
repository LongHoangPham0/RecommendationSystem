const app = require('http').createServer(handler)
const io = require('socket.io')(app);
const fs = require('fs');
const path = require('path');

app.listen(3000, () => {
  console.log(`Server listening on port: 3000`)
});

function handler (req, res) {
  const ext = req.url.split('.').pop();
  let contentType = 'text/html';
  let file = req.url;
  switch (ext) {
    case 'css':
      contentType = 'text/css'
      break;
    case 'js':
      contentType = 'text/javascript'
      break;
    default:
      file = '/index.html';
  }
  fs.readFile(`${__dirname}/dist${file}`, (err, data) => {
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

io.on('connection', (socket) => {
  socket.on('loadMovies', require('./services/loadMovies'));
  socket.on('sortA', require('./services/sortAscending'));
  socket.on('sortZ', require('./services/sortDescending'));
  socket.on('byActor', require('./services/byActor'));
  socket.on('byYear', require('./services/byYear'));
  socket.on('suggestions', require('./services/suggestions'));
  socket.on('userSuggestions', require('./services/userSuggestions'));
});
