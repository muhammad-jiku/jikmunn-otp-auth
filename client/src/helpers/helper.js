//  external imports
import axios from 'axios';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
// console.log(process.env.REACT_APP_SERVER_DOMAIN);
/** Make API Requests */
/** To get username from Token */
export const getUsername = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return Promise.reject('Cannot find Token');
    let decode = jwt_decode(token);
    return decode;
  } catch (error) {
    // console.log('failed to get username', error);
    return {
      message: 'Something went wrong!',
    };
  }
};

/** authenticate function */
export const authenticate = async (username) => {
  try {
    return await axios.post('/api/auth/authenticate', {
      username,
    });
  } catch (error) {
    // console.log('failed to authenticate',error);
    return {
      message: "Username doesn't exist...!",
    };
  }
};

/** get User details */
export const getUser = async ({ username }) => {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    // console.log('failed to get user', error);
    return {
      message: "Password doesn't Match...!",
    };
  }
};

/** register user function */
export const registerUser = async (credentials) => {
  try {
    const {
      data: { message },
      status,
    } = await axios.post(`/api/auth/register`, credentials);

    let { username, email } = credentials;

    /** send email */
    if (status === 200 || status === 201) {
      await axios.post('/api/auth/registerMail', {
        username,
        userEmail: email,
        text: message,
      });
    }

    return Promise.resolve(message);
  } catch (error) {
    // console.log('failed to register account', error);
    return Promise.reject({
      error,
    });
  }
};

/** login function */
export const verifyPassword = async ({ username, password }) => {
  try {
    // console.log({ username, password });
    if (username) {
      const { data } = await axios.post('/api/auth/login', {
        username,
        password,
      });
      // console.log(data);
      return Promise.resolve({
        data,
      });
    }
  } catch (error) {
    // console.log('failed to verify password', error);
    return Promise.reject({
      message: "Password doesn't Match...!",
    });
  }
};

/** update user profile function */
export const updateUser = async (response) => {
  // console.log(response);
  const updatedUserInfo = {
    ...response,
  };
  // console.log(JSON.stringify(updatedUserInfo));
  try {
    const token = await localStorage.getItem('accessToken');
    // console.log(token);
    const data = await axios.put('/api/user/update', updatedUserInfo, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log('updated data', data);
    return Promise.resolve({
      data,
    });
  } catch (error) {
    // console.log('updatee error...', error );
    return Promise.reject({
      message: "Couldn't Update Profile...!",
    });
  }
};

/** generate OTP */
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get('/api/auth/generateOTP', {
      params: {
        username,
      },
    });

    // send mail with the OTP
    if (status === 201) {
      let { data } = await getUser({ username });
      // console.log(data?.data[0]?.email);
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post('/api/auth/registerMail', {
        username,
        userEmail: data?.data[0]?.email,
        text,
        subject: 'Password Recovery OTP',
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    // console.log('failed to generate otp',error);
    return Promise.reject({
      error,
    });
  }
}

/** verify OTP */
export const verifyOTP = async ({ username, code }) => {
  try {
    const { data, status } = await axios.get('/api/auth/verifyOTP', {
      params: { username, code },
    });
    // console.log(data, status);
    return {
      data,
      status,
    };
  } catch (error) {
    // console.log('failed to verify otp',error);
    return Promise.reject(error);
  }
};

/** reset password */
export const resetPassword = async ({ username, password }) => {
  try {
    const { data, status } = await axios.put('/api/auth/resetPassword', {
      username,
      password,
    });
    // console.log(data, status);
    return Promise.resolve({
      data,
      status,
    });
  } catch (error) {
    // console.log('failed to reset password', error);
    return Promise.reject({
      error,
    });
  }
};
