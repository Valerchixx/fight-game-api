import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get('/', (req, res, next) => {
  try {
    const users = userService.getAllUsers();
    res.data = users;
    if(!users) {
      res.error = "Users were not found";
    }
  } catch(error) {
    res.error = error;
  } finally {
    next()
  }
},responseMiddleware)

router.get('/:id', (req, res, next) => {  
  try {
    const userId = req.params.id;
    const user = userService.getUserById(userId);
    res.data = user;
    if(!user) {
      res.error = 'User was not found'
    }
  } catch(error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware)

router.post('/', createUserValid, (req, res, next) => {
  try {
    if(res.error) {
      return next()
    }
    const newUser = userService.createNewUser(req.body);
    if(newUser === null) {
      res.error = 'Error while creating user'
    } else {
      res.data = newUser;
    } 
  } catch(error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware)

router.patch('/:id',updateUserValid, (req, res, next) => {
  try {
    if(res.error) {
    return next()
    }
    const userId = req.params.id;
    const dataToUpdate = req.body;
    const updatedUser = userService.updateUser(userId, dataToUpdate);
    if(updatedUser === null) {
      res.error = 'Error while updating user'
    } else {
      res.data ='Updated succesfully'
    }
  } catch(error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware)

router.delete('/:id', (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = userService.deleteUser(userId);
    if(deletedUser === null) {
      res.error = 'User does not exist'
    } else {
      res.data = 'Deleted succesfully'
    }
  } catch(error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware)

export { router };
