import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAllUsers() {

  }

  createNewUser(userData) {

  }

  updateUser(userId) {

  }

  deleteUser(userId) {

  }
}

const userService = new UserService();

export { userService };
