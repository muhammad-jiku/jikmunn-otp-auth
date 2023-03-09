const {
  createResetSession,
  generateOTP,
  login,
  register,
  resetPassword,
  verifyOTP,
} = require('../controllers/authController');

const express = require('express');
const authRouter = express.Router({
  caseSensitive: true,
});

/** POST Methods */
authRouter.route('/register').post(register); // register user
// authRouter.route('/registerMail').post(); // send the email
authRouter.route('/authenticate').post((req, res) => res.end()); // authenticate user
authRouter.route('/login').post(login); // login in app

/** GET Methods */
authRouter.route('/generateOTP').get(generateOTP); // generate random OTP
authRouter.route('/verifyOTP').get(verifyOTP); // verify generated OTP
authRouter.route('/createResetSession').get(createResetSession); // reset all the variables

/** PUT Methods */
authRouter.route('/resetPassword').put(resetPassword); // use to reset password

module.exports = authRouter;
