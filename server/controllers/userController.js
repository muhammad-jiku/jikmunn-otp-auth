const User = require('../model/User');
const mongoose = require('mongoose');

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
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'There is a server side error!',
      // error: err
    });
  }
};

/** PUT: /api/user/update 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
const updateUser = async (req, res) => {
  const { username } = req.user;
  const updatedUserInfo = req.body;
  const opts = {
    runValidators: true,
    new: true,
  };

  try {
    const resultData = User.findOneAndUpdate(
      { username },
      {
        $set: updatedUserInfo,
      },
      {
        opts,
      }
    ).exec();

    // console.log(resultData);
    return res.status(200).json({
      message: 'SUCCESS!!',
      // data
      data: updatedUserInfo,
      // data: JSON.stringify(userData),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'There is a server side error!',
    });
  }
};

module.exports = {
  getUser,
  updateUser,
};
