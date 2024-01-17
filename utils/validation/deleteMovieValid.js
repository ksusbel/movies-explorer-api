const { celebrate, Joi } = require('celebrate');

const deleteMovieValid = celebrate({
    params: Joi.object().keys({
        movieId: Joi.string().hex().length(24).required(),
    }),
  });
  
  module.exports = deleteMovieValid;