const Year = require('../entities/year');

module.exports = (number, callback) => {
  console.log(number)
  let year = Year.getInstance(number);
  callback(year.movies);
}
