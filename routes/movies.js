const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

//  GET /movies — возвращает все сохранённые текущим пользователем фильмы
movieRouter.get('/', auth, getMovies);

//  POST /movies — # создаёт фильм с переданными в теле
//  country,director,duration,year,description,image,trailer,nameRU,nameEN и thumbnail, movieId
movieRouter.post(
  '/',
  auth,
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(/https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
      trailerLink: Joi.string().required().regex(/https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
      thumbnail: Joi.string().required().regex(/https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

// DELETE /movies/_id — удаляет сохранённый фильм по id
movieRouter.delete(
  '/:movieId',
  auth,
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required(),
    }),
  }),
  deleteMovie,
);

module.exports = movieRouter;
