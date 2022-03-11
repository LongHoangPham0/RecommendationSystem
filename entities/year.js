class Year extends Number{

  constructor(number){
    super(number);
    this.number = number;
    this.movies = [];
  }

  static getInstance(number, movie){
    Year.list = Year.list || [];

    let year = Year.list.find(year => {
      return year == number;
    });

    if(!year){
      year = new Year(number);
      Year.list.push(year);
    }
    if(movie) year.movies.push(movie.id);

    return year;
  }

  toJSON(){
    return this.number;
  }
}

module.exports = Year;
