const { celebrate, Joi } = require('celebrate');

const createUserValid = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }).unknown(true),  
});

module.exports = createUserValid;