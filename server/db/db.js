const connection = require('./connection')

const close = (db = connection) => {
  db.destroy()
}

const getAllMovies = (db = connection) => {
  return db('movies').then(movies => {
    return Promise.all(
      movies.map(movie => {
        return db('movie_tests')
          .select('test_type as testType', 'result')
          .where('movie_tests.movie_id', movie.id)
          .then(tests => {
            return {
              id: movie.id,
              title: movie.title,
              recommended: movie.recommended,
              apiMovieId: movie.API_movie_id,
              movieTests: tests,
              image: movie.image,
              rating: movie.rating
            }
          })
      })
    )
  })
}

const getMovieById = (id, db = connection) => {
  return db('movies')
    .where('movies.id', id)
    .first()
    .then(movie => {
      return db('movie_tests')
        .select('test_type as testType', 'result')
        .where('movie_tests.movie_id', id)
        .then(tests => {
          return {
            id: movie.id,
            title: movie.title,
            recommended: movie.recommended,
            apiMovieId: movie.API_movie_id,
            movieTests: tests
          }
        })
    })
}

const getWatchListByUserId = (userId, db = connection) => {
  return db('watchlist')
    .join('users', 'users.id', 'watchlist.user_id')
    .join('movies', 'movies.id', 'watchlist.movie_id')
    .select('watchlist.id', 'movie.title', 'movie.rating')
    .where('user_id', userId)
}

const insertMovieToWatchList = (userId, movieId, db = connection) => {
  return db('watchlist').insert({ user_id: userId, movie_id: movieId })
}

const delMovieFromWatchList = (watchListId, db = connection) => {
  return db('watchlist')
    .del()
    .where('id', watchListId)
}

const getSeenListByUserId = (userId, db = connection) => {
  return db('seenlist')
    .join('users', 'users.id', 'seenlist.user_id')
    .join('movies', 'movies.id', 'seenlist.movie_id')
    .select('seenlist.id')
    .where('user_id', userId)
}

const insertMovieToSeenListByUserId = (userId, movieId, db = connection) => {
  return db('seenlist').insert({ user_id: userId, movie_id: movieId })
}

const delMovieFromSeenList = (seenListId, db = connection) => {
  return db('seenlist')
    .del()
    .where('id', seenListId)
}

module.exports = {
  close,
  getMovieById,
  getAllMovies,
  getWatchListByUserId,
  insertMovieToWatchList,
  delMovieFromWatchList,
  getSeenListByUserId,
  delMovieFromSeenList,
  insertMovieToSeenListByUserId
}
