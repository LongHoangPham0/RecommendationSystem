window.app = (() => {
  let socket = io();
  let movies = {};
  let appElement = document.querySelector('#app');

  socket.emit('loadMovies', (data) => {
    data.forEach((movie) => {
      movies[movie.id] = movie;
    })
    show(Object.keys(movies));
  });

  function show(ids){
    appElement.innerHTML = '';
    ids.forEach((id) => {
      let movieElement = document.createElement('rocka-movie');
      movieElement.id = id;
      appElement.appendChild(movieElement);
    });
  }

  return {
    restart: () => { show(Object.keys(movies)); },
    getMovie: id => movies[id],
    sortA : () => { socket.emit('sortA', show); },
    sortZ : () => { socket.emit('sortZ', show); },
    byActor : (name) => { socket.emit('byActor', name, show); },
    byYear : (year) => { socket.emit('byYear', year, show); },
    suggestions : (id) => { socket.emit('suggestions', id, show); },
    userSuggestions: () => { socket.emit('userSuggestions', show); },
  }
})();
