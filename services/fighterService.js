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
    const fighter = fighterRepository.getOne(id);
    if(!fighter) {
      return null;
    }
    return fighter;
  };

  createNewFighter(data) {
  };

  updateFighter(id, data) {};

  deleteFighter(id) {};
}

const fighterService = new FighterService();

export { fighterService };
