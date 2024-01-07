require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/error-handler');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const loginValid = require('./utils/validation/loginValid');
const createUserValid = require('./utils/validation/createUserValid');

// Слушаем 3001 порт
const { PORT = 3001, DATABASE_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // 100 запросов с одного IP
});

app.use(cors({
  origin: [
    'https://localhost:3001',
    'http://localhost:3001',
    'https://ksusbeldiplom.nomoredomainsmonster.ru',
    'http://ksusbeldiplom.nomoredomainsmonster.ru',
    'https://api.ksusbeldiplom.nomoredomainsmonster.ru',
    'http://api.ksusbeldiplom.nomoredomainsmonster.ru',
  ],
  credentials: true,
  maxAge: 30,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(helmet());

app.post(
  '/signup',
  createUserValid,
  createUser,
);

app.post(
  '/signin',
  loginValid,
  login,
);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use('/*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
