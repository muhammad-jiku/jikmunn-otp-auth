//  internal import
const User = require('../model/User');

/** GET: /api/user/example123 */
const getUser = async (req, res) => {
  const { username } = await req.params;
  try {
    const data = await User.find({
      username,
    }).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    res.status(200).json({
      message: 'SUCCESS!!',
      data,
    });
  } catch (error) {
    // console.log('getting user error', error);
    res.status(500).json({
      message: 'Something went wrong!',
      // error: err
    });
  }
};

/** PUT: /api/user/update*/
const updateUser = async (req, res) => {
  const { username } = req.user;
  const updatedUserInfo = req.body;
  const opts = {
    runValidators: true,
    new: true,
  };

  try {
    await User.findOneAndUpdate(
      { username },
      {
        $set: updatedUserInfo,
      },
      {
        opts,
      }
    ).exec();

    return res.status(200).json({
      message: 'SUCCESS!!',
      // data
      data: updatedUserInfo,
    });
  } catch (error) {
    // console.log('updating user info error', error);
    res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};

module.exports = {
  getUser,
  updateUser,
};
