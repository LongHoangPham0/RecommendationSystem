class Actor extends String{

  constructor(name){
    super(name);
    this.name = name;
    this.movies = [];
  }

  static getInstance(name, movie){
    Actor.list = Actor.list || [];

    let actor = Actor.list.find(actor => {
      return actor == name;
    });

    if(!actor){
      actor = new Actor(name);
      Actor.list.push(actor);
    }
    if(movie) actor.movies.push(movie.id);

    return actor;
  }

  toJSON(){
    return this.name;
  }
}

module.exports = Actor;
