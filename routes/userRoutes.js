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
  } catch (error) {
    res.error = error;
  } finally {
    next()
  }
},responseMiddleware)

router.get('/:id', (req, res) => {}, responseMiddleware)

router.post('/', createUserValid, (req, res) => {}, responseMiddleware)

router.patch('/:id',updateUserValid, (req, res) => {}, responseMiddleware)

router.delete('/:id', (req, res) => {}, responseMiddleware)

export { router };
