const fs = require('fs')
const loadMovies = require('../services/loadMovies')
const linearRegression = require('./linear-regression')

loadMovies((movies) => {
  let numberUsers = 30
  let users = Array.apply(null, Array(numberUsers))
  users = users.map(i => [])

  movies.forEach((movie) => {
    movie.ratings.forEach((score, i) => users[i].push(score))
  })

  let classes = {}
  movies.forEach((movie) => {
    movie.genres.forEach(genre => classes[genre] = 0)
  })

  let n = Object.keys(classes).length

  let xTrain = movies.map((movie) => {
    let genres = Object.assign({}, classes) 
    movie.genres.forEach(genre => genres[genre] = 1 / movie.genres.length)
    return Object.values(genres)
  })

  let F = (thetas, xs) => {
    return thetas.reduce((acum, theta, i)=>{
      return acum + theta * xs[i]
    }, 0)
  }

  let allThetas = users.map((yTrain, k) => {
    console.time(`User ${k+1}/${users.length}`)    

    let J = (thetas) => {
      return xTrain.reduce((acum, xs, i) => {
        return acum + Math.pow(F(thetas, xs) - yTrain[i], 4)
      }, 0)
    }

    let thetas = linearRegression(J, n)

    let error = Math.sqrt(Math.sqrt(J(thetas)))
    console.log(`Error: ${error}`)

    console.timeEnd(`User ${k+1}/${users.length}`)
    return thetas
  })

  let J = (XS) => { // [....n, .....n, .....n]
    return allThetas.reduce((total, thetas, j) => {
      movies.forEach((movie, i) => {
        let xs = XS.slice(i * n, i * n + n)
        total += Math.pow(F(thetas, xs) - users[j][i], 4)
      })
      return total
    }, 0)
  }

  console.time(`Final optimization`)
  classes = Object.keys(classes)
  let xs = linearRegression(J, n * movies.length, (newTheta, theta, i) => {
    let indexMovie = parseInt(i / n)
    let indexGenre = i % n
    let genre = classes[indexGenre]
    let movie = movies[indexMovie]
    let exists = !!movie.genres.find(genreObj => genreObj.name === genre)
    if(exists) return newTheta > 0 ? newTheta : 1
    return newTheta > 0 && newTheta < 1 ? newTheta : 0.05
  })
  let error = Math.sqrt(Math.sqrt(J(xs))) / movies.length
  console.log(`Error final: ${error}`)
  console.timeEnd(`Final optimization`)
  
  movies = movies.map((movie, i) => xs.slice(i * n, i * n + n))
  fs.writeFile('ml/xs.json', JSON.stringify(movies, null, '\t'))
})