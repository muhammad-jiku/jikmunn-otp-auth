const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');

/** POST: /api/auth/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
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
      return res.status(400).json({ message: 'User already exists' });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: 'There is a server side error',
      // error: err
    });
  }
};

/** POST: /api/auth/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
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
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: 'There is a server side error',
      // error: err
    });
  }
};

/** GET: /api/auth/generateOTP */
const generateOTP = async (req, res) => {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({
    code: req.app.locals.OTP,
  });
};

/** GET: /api/auth/verifyOTP */
const verifyOTP = async (req, res) => {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({
      message: 'Verify Successsfully!',
    });
  }
  return res.status(400).send({
    message: 'Invalid OTP',
  });
};

// successfully redirect user when OTP is valid
/** GET: /api/auth/createResetSession */
const createResetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false; // allow access to this route only once
    // return res.status(201).send({
    //   message: 'access granted!',
    // });
    return res.status(201).send({
      flag: req.app.locals.resetSession,
    });
  }
  return res.status(440).send({
    message: 'Session expired!',
  });
};

// update the password when we have valid session
/** PUT: /api/auth/resetPassword */
const resetPassword = async (req, res) => {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({
        message: 'Session expired!',
      });

    const { username, password } = await req.body;

    try {
      const oldUser = await User.findOne({
        username: username,
      });

      if (!oldUser) {
        return res.status(404).json({ message: 'User does not exist' });
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);

        const updatedUser = {
          username,
          password: hashedPassword,
          profile: oldUser?.profile || '',
          email: oldUser?.email,
        };
        const opts = {
          runValidators: true,
        };

        const saveUpdatedUser = await User.findOneAndUpdate(
          {
            username: username,
          },
          {
            $set: updatedUser,
          },
          {
            new: true,
            opts,
          }
        );

        req.app.locals.resetSession = false; // reset session

        res.status(200).json({
          message: 'User password updated successfully!!',
          data: saveUpdatedUser,
        });
      }
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(401).send({
      message: error.message,
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
