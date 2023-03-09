/** GET: /api/generateOTP */
export const generateOTP = async (req, res) => {
  res.json('generateOTP route');
};

/** GET: /api/verifyOTP */
export const verifyOTP = async (req, res) => {
  res.json('verifyOTP route');
};

// successfully redirect user when OTP is valid
/** GET: /api/createResetSession */
export const createResetSession = async (req, res) => {
  res.json('createResetSession route');
};

// update the password when we have valid session
/** PUT: /api/resetPassword */
export const resetPassword = async (req, res) => {
  res.json('resetPassword route');
};
