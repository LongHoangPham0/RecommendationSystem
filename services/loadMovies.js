const https = require('https');
const Movie = require('../entities/movie');

let data = [];
let fetched = false;

module.exports = (callback) => {
  if(!fetched){
    https.request({
      host: 'gist.githubusercontent.com',
      port: 443,
      path: 'ml/movies-database-v2.json',
      method: 'GET'
    }, (res) => {
      let json = '';
      res.setEncoding('utf8');
      res.on('data', chunk => json += chunk);

      res.on('end', () => {
        const obj = JSON.parse(json);
        data = obj.map(movie => new Movie(movie));
        fetched = true;
        callback(data);
      });
    }).end();
  }
  else{
    callback(data);
  }
}
