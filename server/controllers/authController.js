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
  res.json('register route');
};

/** POST: /api/auth/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
const login = async (req, res) => {
  res.json('login route');
};

/** GET: /api/auth/generateOTP */
const generateOTP = async (req, res) => {
  res.json('generateOTP route');
};

/** GET: /api/auth/verifyOTP */
const verifyOTP = async (req, res) => {
  res.json('verifyOTP route');
};

// successfully redirect user when OTP is valid
/** GET: /api/auth/createResetSession */
const createResetSession = async (req, res) => {
  res.json('createResetSession route');
};

// update the password when we have valid session
/** PUT: /api/auth/resetPassword */
const resetPassword = async (req, res) => {
  res.json('resetPassword route');
};

module.exports = {
  register,
  login,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
};
