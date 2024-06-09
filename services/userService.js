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

  updateUser(id, data) {
    const updatedUser = userRepository.update(id, data);
    if(!updatedUser) {
      return null;
    }
    return updatedUser;
  }

  deleteUser(id) {
    const user = this.getUserById(id)
    if(user) {
      return userRepository.delete(id)
    }
    return null;
  }

  isPhoneNumberValid(phone) {
    return phone.startsWith('+380') && phone.length === 13
  }

  isEmailValid(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }

  isPasswordCorrect(password) {
    return typeof password === 'string' && password.length >= 3;
  }

  isNoRedundantKeys(bodyObject, model) {
    return Object.keys(bodyObject).every(key => Object.keys(model).includes(key))
  }
}

const userService = new UserService();

export { userService };
