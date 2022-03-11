const loadMovies = require('./loadMovies');

module.exports = (movie, callback) => {

  function removeDuplicates(originalArray, prop) {
    const newArray = [];
    const lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }


  loadMovies((data) => {
    // Then we get the genres of the movie
    movie = data.find(m => m.id == movie);
    // We create a list with the movies that share the same genres
    let movies = [];
    movie.genres.forEach(genre => {
      movies.push.apply(movies, genre.movies.filter(m => m.id != movie.id));
    });
    movies = removeDuplicates(movies, 'id');
    movies = movies.map(m => {
      return {
        proximity: 0,
        movie: m
      }
    })
    //we assume that the ratings always are 30 and in order we the same users, so,
    //we are going to look for the ratings > 5, and in those, look, the minimal
    //difference of comparing with the other movies, but just on the ratings
    //position > 5.
    let ratingsToWork = movie.ratings.map(r => r > 5 ? 1 : 0);
    movies.forEach(m => {
      for(let i=0; i<ratingsToWork.length;i++){
        m.proximity += ratingsToWork[i] * Math.abs(movie.ratings[i] - m.movie.ratings[i]);
      }
    })

    // Finally we sort ascending and we take some movies to suggest
    movies = movies.sort((a,b) => a.proximity - b.proximity);
    movies = movies.slice(0, 5);

    callback(movies.map(m => m.movie.id));
  })
}
