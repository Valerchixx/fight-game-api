import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get('/', (req, res,next) => {
  try {
    const fighters = fighterService.getAllFighters();
    res.data = fighters;
    if(!fighters) {
      res.error = 'Fighters were not found'
    }
  } catch(error) {
    res.error = error
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {}, responseMiddleware);

router.patch('/:id', updateFighterValid, (req, res, next) => {}, responseMiddleware);

router.delete('/:id', (req, res, next) => {}, responseMiddleware);

export { router };
