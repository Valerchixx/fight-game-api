import { userRepository } from "../repositories/userRepository.js";

class UserService {
  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAllUsers() {
    const users = userRepository.getAll()
    if(!users) {
      return null
    }
    return users;
  }

  getUserById(userId) {
    const user = this.search(userId);
    return user
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
