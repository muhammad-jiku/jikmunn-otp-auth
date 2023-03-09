/** GET: /api/user/example123 */
const getUser = async (req, res) => {
  const { username } = await req.params;
  try {
    const data = await User.find({ username }).select({
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

/** PUT: /api/user/updateuser 
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
  const { userId } = req.user;
  const updatedUserInfo = req.body;
  const opts = { runValidators: true };
  if (mongoose.Types.ObjectId.isValid(userId)) {
    User.findByIdAndUpdate(
      { _id: userId },
      {
        $set: updatedUserInfo,
      },
      {
        opts,
      },
      (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: 'There is a server side error!',
            // error: err
          });
        } else {
          res.status(200).json({
            message: 'User updated successfully!!',
            data: updatedUserInfo,
          });
        }
      }
    ).clone();
  } else {
    res.status(500).json({
      message: 'There is a server side error!',
    });
  }
};

module.exports = {
  getUser,
  updateUser,
};
