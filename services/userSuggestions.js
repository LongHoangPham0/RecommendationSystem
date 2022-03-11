const loadMovies = require('./loadMovies')
const myRatings = require('../ml/my-ratings.json')
const linearRegression = require('../ml/linear-regression')
const calculatedXs = require('../ml/xs.json')

let predictions = []

loadMovies((movies) => {
  let classes = {}
  movies.forEach((movie) => {
    movie.genres.forEach(genre => classes[genre] = 0)
  })

  let xs = movies.map((movie, i) => calculatedXs[i])

  let xTrain = xs.filter((array, i) => myRatings[i])
  let yTrain = myRatings.filter((array, i) => myRatings[i])

  let F = (thetas, xs) => {
    return thetas.reduce((acum, theta, i)=>{
      return acum + theta * xs[i]
    }, 0)
  }

  let J = (thetas) => {
    return xTrain.reduce((acum, xs, i) => {
      return acum + Math.pow(F(thetas, xs) - yTrain[i], 4)
    }, 0)
  }

  let n = Object.keys(classes).length

  console.time('Optimizing...')
  let thetas = linearRegression(J, n)
  console.timeEnd('Optimizing...')
  let error = Math.sqrt(Math.sqrt(J(thetas)))
  console.log(`Error: ${error}`)

  predictions = movies.map((movie, i) => ({
      prediction: F(thetas, xs[i]),
      movie: movie,
    }))
    .filter(obj => obj.prediction > 6)
    .sort((a, b) => b.prediction - a.prediction)
    .map(obj => obj.movie.id)
})

module.exports = (callback) => {
  callback(predictions)
}