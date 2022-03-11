class Genre extends String{

  constructor(name){
    super(name);
    this.name = name;
    this.movies = [];
  }

  static getInstance(name, movie){
    Genre.list = Genre.list || [];

    let genre = Genre.list.find(genre => {
      return genre == name;
    });

    if(!genre){
      genre = new Genre(name);
      Genre.list.push(genre);
    }
    genre.movies.push(movie);

    return genre;
  }

  toJSON(){
    return this.name;
  }
}

module.exports = Genre;
