const { getUser, updateUser } = require('../controllers/userController');

const express = require('express');
const userRouter = express.Router({
  caseSensitive: true,
});

/** GET Methods */
userRouter.route('/:username').get(getUser); // user with username

/** PUT Methods */
userRouter.route('/updateuser').put(updateUser); // is use to update the user profile

module.exports = userRouter;
