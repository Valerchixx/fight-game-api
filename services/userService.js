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

  getUserById(id) {
    const user = this.search({id});
    return user
  }

  createNewUser(userData) {
    const newUser = userRepository.create(userData);
    return newUser;
  }

  updateUser(userId) {

  }

  deleteUser(id) {
    const user = this.getUserById(id)
    if(user) {
      return userRepository.delete(id)
    }
    return null;
  }
}

const userService = new UserService();

export { userService };
