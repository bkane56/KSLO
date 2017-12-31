import { userConstants } from '../consatants';
import { firebaseService } from '../services';

import { history } from '../helpers';

export const userActions = {
  loginUser,
  logoutUser,
  registerUser,
  getAllUsers,
  deleteUser: _deleteUser,
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
    payload: firebaseService.createUserWithEmailAndPassword(email, password)
  };
}

function getAllUsers() {

}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteUser(id) {

}


