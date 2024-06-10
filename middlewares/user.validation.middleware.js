import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const createUserValid = (req, res, next) => {
  const {['id']: omit, ...rest} = USER;
  const userWithoutId = rest;
  const bodyUserObject = req.body
  const isRequiredKeysPresent = Object.keys(userWithoutId).every(key => Object.keys(bodyUserObject).includes(key));
  const isNoRedundantKeys =  userService.isNoRedundantKeys(bodyUserObject, userWithoutId);
  if(!isRequiredKeysPresent || !isNoRedundantKeys) {
    res.error = 'Invalid user entity while creating'
    return next();
  }

  const {password, phoneNumber, email} = bodyUserObject
 
  const isEmailCorrect = userService.isEmailValid(email);
  if(!isEmailCorrect) {
    res.error = 'Email is not valid';
    return next();
  }
  const isPasswordCorrect = userService.isPasswordCorrect(password);
  if(!isPasswordCorrect) {
    res.error = 'Password is not valid';
    return next();
  }
  const isPhoneCorrect = userService.isPhoneNumberValid(phoneNumber);
  if(!isPhoneCorrect) {
    res.error = 'Phone is not valid';
    return next();
  }

  const isUserWithSameEmail = userService.isUserWithSameEmail(null, email);
  if(isUserWithSameEmail) {
    res.error = 'User with same email already exist';
    return next();
  }

  const isUserWithSamePhone = userService.isUserWithSamePhone(null,phoneNumber);
  if(isUserWithSamePhone) {
    res.error = 'User with same phone number already exist';
    return next()
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const {['id']: omit, ...rest} = USER;
  const userWithoutId = rest;
  const bodyUserObject = req.body;
  const isKeysValid = Object.keys(bodyUserObject).some(key => Object.keys(userWithoutId).includes(key));
  const isNoRedundantKeys =  userService.isNoRedundantKeys(bodyUserObject, userWithoutId);

  if(!isKeysValid || !isNoRedundantKeys) {
    res.error = 'Invalid user entity while updating';
    return next()
  }

  const {password, phoneNumber, email} = bodyUserObject;
  const id = req.params.id;
 
  if(email && !userService.isEmailValid(email)) {
    res.error = 'Email is not valid';
    return next();
  }
  if(password && !userService.isPasswordCorrect(password)) {
    res.error = 'Password is not valid';
    return next();
  }
  if(phoneNumber && !userService.isPhoneNumberValid(phoneNumber)) {
    res.error = 'Phone is not valid';
    return next();
  }

  const isUserWithSameEmail = userService.isUserWithSameEmail(id,email);
  if(isUserWithSameEmail) {
    res.error = 'User with same email already exist';
    return next();
  }

  const isUserWithSamePhone = userService.isUserWithSamePhone(id,phoneNumber);
  if(isUserWithSamePhone) {
    res.error = 'User with same phone number already exist';
    return next()
  }
  next();
};

export { createUserValid, updateUserValid };
