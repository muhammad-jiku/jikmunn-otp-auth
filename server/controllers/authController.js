const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');

/** POST: /api/auth/register */
const register = async (req, res) => {
  try {
    const { username, password, profile, email } = await req.body;

    const oldUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (!oldUser) {
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        username: username.toLowerCase(),
        password: hashedPassword,
        profile: profile || '',
        email,
      });

      const savedUser = await newUser.save();

      const token = jwt.sign(
        {
          username: savedUser.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '86400s',
        }
      );

      res.status(200).json({
        message: 'User added successfully!!',
        data: savedUser,
        accessToken: token,
      });
    } else {
      return res.status(400).json({
        message: 'User already exists',
      });
    }
  } catch (error) {
    // console.log('creating account error',error);
    res.status(500).json({
      message: 'Something went wrong!',
      // error:
    });
  }
};

/** POST: /api/auth/login*/
const login = async (req, res) => {
  try {
    const { username, password } = await req.body;
    const oldUser = await User.findOne({
      username: username,
    });

    if (!oldUser) {
      return res.status(404).json({ message: 'User does not exist' });
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        oldUser.password
      );
      console.log(password, oldUser?.password);
      if (!isPasswordCorrect)
        return res.status(400).json({
          message: 'Something went wrong',
        });

      const token = jwt.sign(
        {
          username: oldUser.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '86400s',
        }
      );

      res.status(200).json({
        message: 'User existence test passed successfully!!',
        data: oldUser,
        accessToken: token,
      });
    }
  } catch (error) {
    // console.log('login error', error);
    res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};

/** GET: /api/auth/generateOTP */
const generateOTP = async (req, res) => {
  try {
    req.app.locals.OTP = await otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    res.status(201).send({
      code: req.app.locals.OTP,
    });
  } catch (error) {
    // console.log('generating otp error',error);
    res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};

/** GET: /api/auth/verifyOTP */
const verifyOTP = async (req, res) => {
  try {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
      req.app.locals.OTP = null; // reset the OTP value
      req.app.locals.resetSession = true; // start session for reset password
      return res.status(201).send({
        message: 'Verify Successsfully!',
      });
    }
    return res.status(400).send({
      message: 'Something went wrong!!',
    });
  } catch (error) {
    // console.log('verify otp error', error);
    res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};

// successfully redirect user when OTP is valid
/** GET: /api/auth/createResetSession */
const createResetSession = async (req, res) => {
  try {
    req.app.locals.resetSession = true;
    // console.log(req.app.locals.resetSession);
    if (req.app.locals.resetSession) {
      req.app.locals.resetSession = false; // allow access to this route only once
      // console.log(req.app.locals.resetSession);
      return res.status(201).send({
        flag: req.app.locals.resetSession,
        message: 'access granted!',
      });
    }
    return res.status(440).send({
      message: 'Something went wrong!!',
    });
  } catch (error) {
    // console.log('creating session error', error);
    res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};

// update the password when we have valid session
/** PUT: /api/auth/resetPassword */
const resetPassword = async (req, res) => {
  try {
    req.app.locals.resetSession = true;
    if (!req.app.locals.resetSession)
      return res.status(440).send({
        message: 'Something went wrong!!',
      });

    const { username, password } = await req.body;
    console.log(req.body);
    try {
      const oldUser = await User.findOne({
        username: username,
      });

      if (!oldUser) {
        return res.status(404).json({
          message: 'Something went wrong!',
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);

        const updatedUser = {
          username,
          password: hashedPassword,
        };
        const opts = {
          runValidators: true,
          new: true,
        };

        const saveUpdatedUser = await User.findOneAndUpdate(
          {
            username: username,
          },
          {
            $set: updatedUser,
          },
          {
            opts,
          }
        ).exec();

        req.app.locals.resetSession = false; // reset session

        res.status(200).json({
          message: 'User password updated successfully!!',
          data: saveUpdatedUser,
        });
      }
    } catch (error) {
      // console.log('user error',error);
      return res.status(500).send({
        message: 'Something went wrong!',
      });
    }
  } catch (error) {
    // console.log('reseting password error',error);
    return res.status(401).send({
      message: 'Something went wrong!',
    });
  }
};

module.exports = {
  register,
  login,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
};
