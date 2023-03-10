//  external import
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide unique Username'],
      unique: [true, 'Username Exist'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      unique: false,
    },
    email: {
      type: String,
      required: [true, 'Please provide a unique email'],
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobile: {
      type: String,
    },
    address: {
      type: String,
    },
    profile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model.Users || new mongoose.model('User', UserSchema);

// exporting module
module.exports = User;
