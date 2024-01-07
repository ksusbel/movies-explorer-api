const movieRouter = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const createMovieValid = require('../utils/validation/createMovieValid');
const deleteMovieValid = require('../utils/validation/deleteMovieValid');

//  GET /movies — возвращает все сохранённые текущим пользователем фильмы
movieRouter.get('/', auth, getMovies);

//  POST /movies — # создаёт фильм с переданными в теле
//  country,director,duration,year,description,image,trailer,nameRU,nameEN и thumbnail, movieId
movieRouter.post(
  '/',
  auth,
  createMovieValid,
  createMovie,
);

// DELETE /movies/_id — удаляет сохранённый фильм по id
movieRouter.delete(
  '/:movieId',
  auth,
  deleteMovieValid,
  deleteMovie,
);

module.exports = movieRouter;
