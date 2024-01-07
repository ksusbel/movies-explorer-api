const { celebrate, Joi } = require('celebrate');

const updateUserInfoValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    }),
});

module.exports = updateUserInfoValid;