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
    const user = userRepository.getOne(id);
    if(!user) {
      return null;
    }
    return user
  }

  createNewUser(userData) {
    const newUser = userRepository.create(userData);
    return newUser;
  }

  updateUser(id, data) {
    const isUserExist = this.getUserById(id);
    let updatedUser = null;
    if(isUserExist) {
      updatedUser = userRepository.update(id, data);
      if(!updatedUser) {
        return null;
      }  
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

  isUserWithSameEmail(id,email) { 
    const userWithSameEmail = userRepository.getOne(email);
    if(!userWithSameEmail || userWithSameEmail.id === id) {
      return null
    }
    return userWithSameEmail;

  }

  isUserWithSamePhone(id, phoneNumber) {
    const userWithSamePhone = userRepository.getOne(phoneNumber);
    if(!userWithSamePhone || userWithSamePhone.id === id) {
      return null;
    }
    return userWithSamePhone;
  }
}

const userService = new UserService();

export { userService };
