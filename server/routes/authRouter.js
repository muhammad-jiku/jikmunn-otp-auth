const {
  createResetSession,
  generateOTP,
  login,
  register,
  resetPassword,
  verifyOTP,
} = require('../controllers/authController');

const express = require('express');
const { registerMail } = require('../utils/mailer');
const { localVariables } = require('../middlewares/verifyAuth');
const { verifyUser } = require('../middlewares/verifyUser');
const authRouter = express.Router({
  caseSensitive: true,
});

/** POST Methods */
authRouter.route('/register').post(register); // register user
authRouter.route('/registerMail').post(registerMail); // send the email
authRouter.route('/authenticate').post(verifyUser, (req, res) => res.end()); // authenticate user
authRouter.route('/login').post(verifyUser, login); // login in app

/** GET Methods */
authRouter.route('/generateOTP').get(verifyUser, localVariables, generateOTP); // generate random OTP
authRouter.route('/verifyOTP').get(verifyUser, verifyOTP); // verify generated OTP
authRouter.route('/createResetSession').get(createResetSession); // reset all the variables

/** PUT Methods */
authRouter.route('/resetPassword').put(verifyUser, resetPassword); // use to reset password

module.exports = authRouter;
