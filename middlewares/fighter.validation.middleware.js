import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";
const createFighterValid = (req, res, next) => {
  const {['id']: omit, ...rest} = FIGHTER;
  const fighterWithoutId = rest;
  const bodyFighterObject = req.body;
  const isBodyContainHealth = Object.keys(bodyFighterObject).includes('health');
  if(!isBodyContainHealth) {
    bodyFighterObject.health = 85
  }
  const isRequiredFieldsPresent = Object.keys(fighterWithoutId).every(key => Object.keys(bodyFighterObject).includes(key));
  const isNoRedundantKeys = fighterService.isNoRedundantKeys(bodyFighterObject, fighterWithoutId);
  if(!isRequiredFieldsPresent || !isNoRedundantKeys) {
    res.error = 'Fighter entity is not valid while creating';
    return next();
  }

  const {power, health, defense, name} = bodyFighterObject

  if(!fighterService.isPowerValid(power)) {
    res.error = 'Invalid power';
    return next();
  }
  if(!fighterService.isHealthValid(health)) {
    res.error = 'Invalid health';
    return next();
  }
  if(!fighterService.isDefenseValid(defense)) {
    res.error = 'Invalid defense';
    return next();
  }

  if(fighterService.isFighterWithSameName(null, name )) {
    res.error = 'Fighter with same name already exist';
    return next();
  }
  next();
};

const updateFighterValid = (req, res, next) => {
  const {['id']: omit, ...rest} = FIGHTER;
  const fighterWithoutId = rest;
  const bodyFighterObject = req.body;
  const isKeysValid = Object.keys(bodyFighterObject).some(key => Object.keys(fighterWithoutId).includes(key));
  const isNoRedundantKeys = fighterService.isNoRedundantKeys(bodyFighterObject, fighterWithoutId);
  if(!isKeysValid || !isNoRedundantKeys) {
    res.error = 'Fighter entity is not valid while updating';
    return next();
  }

  const {power, health, defense, name} = bodyFighterObject;
  const fighterId = req.params.id;

  if(power && !fighterService.isPowerValid(power)) {
    res.error = 'Invalid power';
    return next();
  }
  if(health && !fighterService.isHealthValid(health)) {
    res.error = 'Invalid health';
    return next();
  }
  if(defense && !fighterService.isDefenseValid(defense)) {
    res.error = 'Invalid defense';
    return next();
  }

  if(fighterService.isFighterWithSameName(fighterId, name )) {
    res.error = 'Fighter with same name already exist';
    return next();
  }

  next();
};

export { createFighterValid, updateFighterValid };
