const router = require('express').Router();

const { createUser, login } = require('../controllers/users');

const auth = require('../middlewares/auth');

const loginValid = require('../utils/validation/loginValid');
const createUserValid = require('../utils/validation/createUserValid');

const movieRouter = require('./movies');
const userRouter = require('./users');

router.post('/signup', createUserValid, createUser);
router.post('/signin', loginValid, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;