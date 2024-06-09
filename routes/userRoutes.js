import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

router.get('/', (req, res) => {}, responseMiddleware)

router.get('/:id', (req, res) => {}, responseMiddleware)

router.post('/', createUserValid, (req, res) => {}, responseMiddleware)

router.patch('/:id',updateUserValid, (req, res) => {}, responseMiddleware)

router.delete('/:id', (req, res) => {}, responseMiddleware)

export { router };
