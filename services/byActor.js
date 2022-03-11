const Actor = require('../entities/actor');

module.exports = (name, callback) => {
  let actor = Actor.getInstance(name);
  callback(actor.movies);
}
