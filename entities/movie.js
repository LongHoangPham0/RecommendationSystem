const crypto = require("crypto");
const Year = require('./year');
const Genre = require('./genre');
const Actor = require('./actor');

class Movie{
  constructor(props){
    this.id = crypto.randomBytes(16).toString("hex");
    this.title = props.title;
    this.year = Year.getInstance(props.year, this);
    this.genres = props.genres.map(genre => Genre.getInstance(genre, this));
    this.ratings = props.ratings;
    this.poster = props.posterurl;
    this.releaseDate = props.releaseDate;
    this.description = props.storyline;
    this.actors = props.actors.map(actor => Actor.getInstance(actor, this));
    this.imdbRating = props.imdbRating;

    this.averageRating = parseInt(10 * (props.ratings.reduce((a,b) => a + b) / props.ratings.length)) / 10;
    if(props.contentRating) this.contentRating = props.contentRating;
    if(props.originalTitle) this.originalTitle = props.originalTitle;
    if(props.duration) this.duration = new Number(props.duration.replace( /\D+/g, ''))
  }
}

module.exports = Movie;
