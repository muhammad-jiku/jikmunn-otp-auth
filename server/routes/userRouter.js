const { getUser, updateUser } = require('../controllers/userController');

const express = require('express');
const { verifyAuth } = require('../middlewares/verifyAuth');
const userRouter = express.Router({
  caseSensitive: true,
});

/** GET Methods */
userRouter.route('/:username').get(getUser); // user with username

/** PUT Methods */
userRouter.route('/update').put(verifyAuth, updateUser); // is use to update the user profile

module.exports = userRouter;
