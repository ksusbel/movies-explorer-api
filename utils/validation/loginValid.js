const { celebrate, Joi } = require('celebrate');

const loginValid = celebrate({
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }).unknown(true),
  });
  
  module.exports = loginValid;