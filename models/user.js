const mongoose = require('mongoose');
const validator = require('validator');

const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Имя не должно быть короче 2 символов'],
      maxlength: [30, 'Имя не должно быть длиннее 30 символов'],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Указана неверная почта.',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model('user', userScheme);
