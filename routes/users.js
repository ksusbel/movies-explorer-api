const userRouter = require('express').Router();
const auth = require('../middlewares/auth');

const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

const updateUserInfoValid = require('../utils/validation/updateUserInfoValid');

userRouter.get('/me', auth, getCurrentUser);

userRouter.patch(
  '/me',
  auth,
  updateUserInfoValid,
  updateUser,
);

module.exports = userRouter;
