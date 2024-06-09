import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const {['id']: omit, ...rest} = USER;
  const userWithoutId = rest;
  const bodyUserObject = req.body
  const isRequiredKeysPresent = Object.keys(userWithoutId).every(key => Object.keys(bodyUserObject).includes(key));
  const isNoRedundantKeys =  Object.keys(bodyUserObject).every(key => Object.keys(userWithoutId).includes(key));
  if(!isRequiredKeysPresent || !isNoRedundantKeys) {
    res.error = 'Invalid user entity'
    return next();
  }

  const {password, phoneNumber, email} = bodyUserObject
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isEmailCorrect = emailRegex.test(email);
  if(!isEmailCorrect) {
    res.error = 'Email is not correct';
    return next();
  }
  const isPasswordCorrect = typeof password === 'string' && password.length >= 3;
  if(!isPasswordCorrect) {
    res.error = 'Password is not correct';
    return next();
  }
  const isPhoneCorrect = phoneNumber.startsWith('+380') && phoneNumber.length === 13;
  if(!isPhoneCorrect) {
    res.error = 'Phone is not correct';
    return next();
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  next();
};

export { createUserValid, updateUserValid };
