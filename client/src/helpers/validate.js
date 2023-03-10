/* eslint-disable no-useless-escape */

//  external import
import toast from 'react-hot-toast';
//  internal import
import { authenticate } from './helper';

/** validate login page username */
export const usernameValidate = async (values) => {
  const errors = usernameVerify({}, values);
  if (values.username) {
    // check user exist or not
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error('User does not exist...!');
    }
  }
  // console.log('username valiidation error', errors);
  return errors;
};

/** validate password */
export const passwordValidate = async (values) => {
  const errors = passwordVerify({}, values);
  // console.log('password validation error', errors);
  return errors;
};

/** validate reset password */
export const resetPasswordValidation = async (values) => {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error('Password not match...!');
  }
  // console.log('reset password validation erros', errors);
  return errors;
};

/** validate register form */
export const registerValidation = async (values) => {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);
  // console.log('register validation errors', errors);
  return errors;
};

/** validate profile page */
export const profileValidation = async (values) => {
  const errors = emailVerify({}, values);
  // console.log('profile validation errors', errors);
  return errors;
};

/** ************************************************* */

/** validate password */
const passwordVerify = (errors = {}, values) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error('Password Required...!');
  } else if (values.password.includes(' ')) {
    errors.password = toast.error('Wrong Password...!');
  } else if (values.password.length < 6) {
    errors.password = toast.error(
      'Password must be more than 6 characters long'
    );
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error('Password must have special character');
  }
  // console.log('password values verify errors',errors);
  return errors;
};

/** validate username */
const usernameVerify = (error = {}, values) => {
  if (!values.username) {
    error.username = toast.error('Username Required...!');
  } else if (values.username.includes(' ')) {
    error.username = toast.error('Invalid Username...!');
  }
  // console.log('username values verify errors',error);
  return error;
};

/** validate email */
const emailVerify = (error = {}, values) => {
  if (!values.email) {
    error.email = toast.error('Email Required...!');
  } else if (values.email.includes(' ')) {
    error.email = toast.error('Wrong Email...!');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error('Invalid email address...!');
  }
  // console.log('username values verify errors',error);
  return error;
};
