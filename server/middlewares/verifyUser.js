//  internal import
const User = require('../model/User');

/** middleware for verify user */
const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == 'GET' ? req.query : req.body;

    // check the user existance
    let exist = await User.findOne({ username });
    if (!exist)
      return res.status(404).send({
        message: "Can't find User!",
      });
    next();
  } catch (error) {
    // console.log('verify user auth', error);
    return res.status(404).send({
      message: 'Authentication Error',
    });
  }
};

module.exports = { verifyUser };
