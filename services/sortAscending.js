const loadMovies = require('./loadMovies');

module.exports = (callback) => {
  loadMovies((data) => {
    let sorted = data.slice(0);

    sorted = sorted.sort((a, b) => {
      return a.averageRating - b.averageRating;
    });

    sorted = sorted.map(movie => movie.id);
    callback(sorted);
  })
}
