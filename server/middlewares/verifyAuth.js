const jwt = require('jsonwebtoken');

/** auth middleware */
const verifyAuth = async (req, res, next) => {
  try {
    // access authorize header to validate request
    const accessToken = req.headers.authorization.split(' ')[1];

    // retrive the user details fo the logged in user
    const decodedToken = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    req.user = decodedToken;
    console.log(req.user);
    next();
  } catch (error) {
    // console.log('auth error', error);
    res.status(401).json({
      message: 'Authentication Failed!',
    });
  }
};

const localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};

module.exports = {
  verifyAuth,
  localVariables,
};
