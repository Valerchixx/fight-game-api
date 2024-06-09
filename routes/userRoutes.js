import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get('/', (req, res, next) => {
  const users = userService.getAllUsers();
  res.data = users;
  if(!users) {
    res.error = "Users were not found"
  }
  next()
},responseMiddleware)

router.get('/:id', (req, res, next) => {  
  const userId = req.params.id;
  const user = userService.getUserById(userId);
  res.data = user;
  if(!user) {
    res.error = 'User was not found'
  }
  next()
}, responseMiddleware)

router.post('/', createUserValid, (req, res, next) => {
  if(res.error) {
    return next()
  }
  const newUser = userService.createNewUser(req.body);
  res.data = newUser
  next()
}, responseMiddleware)

router.patch('/:id',updateUserValid, (req, res) => {}, responseMiddleware)

router.delete('/:id', (req, res) => {}, responseMiddleware)

export { router };
