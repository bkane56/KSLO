import { userConstants } from '../consatants';
import { firebaseService } from '../services';

import { history } from '../helpers';

export const userActions = {
  loginUser,
  logoutUser,
  registerUser,
  getAllUsers,
  deleteUser: _deleteUser,
  saveUser,
  getUser,
};

function loginUser(email, password) {
  return {
    type: userConstants.LOGIN_USER,
    payload: firebaseService.signInWithEmailAndPassword(email, password),
  };
}

function logoutUser() {
  return { type: userConstants.LOGOUT };
}

function registerUser(email, password) {
  return {
    type: userConstants.REGISTER_USER,
    payload: firebaseService.createUserWithEmailAndPassword(email, password),
  };
}

function getUser(userId) {
  return {
    type: userConstants.FETCH_USER,
    payload: firebaseService.getUser(userId),
  }
}
function saveUser(user, userId) {
  console.log('saved user at user.actions ', user);
  return {
    type: userConstants.SAVE_USER,
    payload: firebaseService.saveUser(user, userId),
  };
}

function getAllUsers() {
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteUser(id) {

}
