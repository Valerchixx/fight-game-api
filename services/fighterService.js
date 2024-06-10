import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAllFighters() {
    const fighters = fighterRepository.getAll();
    if(!fighters) {
      return null;
    }
    return fighters;
  };

  getFighterById(id) {
    const fighter = fighterRepository.getOne({id});
    if(!fighter) {
      return null;
    }
    return fighter;
  };

  createNewFighter(data) {
    const newFighter = fighterRepository.create(data);
    if(!newFighter) {
      return null;
    }
    return newFighter;
  };

  updateFighter(id, data) {
    const fighter = this.getFighterById(id);
     if(fighter) {
      return fighterRepository.update(id,data);
     }
    return null;
  };

  deleteFighter(id) {
    const fighter = this.getFighterById(id);
    if(fighter) {
      return fighterRepository.delete(id)
    }
    return null;
  };

  isNoRedundantKeys(body, model) {
    return Object.keys(body).every(key => Object.keys(model).includes(key));
  }

  isPowerValid(power) {
    return power >= 1 && power <= 100
  }

  isHealthValid(health) {
    return health >= 80 && health <= 120;
  }

  isDefenseValid(defense) {
    return defense >= 1 && defense <= 10;
  }

  isFighterWithSameName(id, name) {
    const fighterWithSameName = fighterRepository.getOne({name});
    if(!fighterWithSameName || fighterWithSameName.id === id) {
      return null;
    }
    return fighterWithSameName;
  }
}

const fighterService = new FighterService();

export { fighterService };
