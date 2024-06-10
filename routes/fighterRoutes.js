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

router.get('/:id', (req, res, next) => {
  try {
    const fighterId = req.params.id;
    const fighter = fighterService.getFighterById(fighterId);
    res.data = fighter;
    if(!fighter) {
      res.error = 'Fighter was not found';
    }
  } catch(error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {
  try {
    if(res.error) {
      return next();
    }
    const newFighter = fighterService.createNewFighter(req.body);
    if(newFighter === null) {
      res.error = 'Error while creating fighter';
    } else {
      res.data = newFighter;
    }
  } catch(error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.patch('/:id', updateFighterValid, (req, res, next) => {
  try {
    if(res.error) {
      return next();
    }
    const fighterId = req.params.id;
    const dataToUpdate = req.body;
    const updatedFighter = fighterService.updateFighter(fighterId, dataToUpdate);
    if(!updatedFighter) {
      res.error = 'Error while updating fighter';
    } else {
      res.data = updatedFighter;
    }
  } catch(error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
  try {
    const fighterId = req.params.id;
    const deletedFighter = fighterService.deleteFighter(fighterId);
    if(!deletedFighter) {
      res.error = "Error while deleting fighter";
    } else {
      res.data = deletedFighter;
    }
  } catch(error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
