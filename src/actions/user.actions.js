import { userConstants } from '../consatants';
import { firebaseService } from '../services';

const {
  LOGIN_USER, LOGOUT_USER, REGISTER_USER, FETCH_USER, SAVE_USER
} = userConstants;

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
    type: LOGIN_USER,
    payload: firebaseService.signInWithEmailAndPassword(email, password),
  };
}

function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: firebaseService.signOut(),
  };
}

function registerUser(email, password) {
  return {
    type: REGISTER_USER,
    payload: firebaseService.createUserWithEmailAndPassword(email, password),
  };
}

function getUser(userId) {
  return {
    type: FETCH_USER,
    payload: firebaseService.getUser(userId),
  }
}
function saveUser(user, userId) {
  console.log('saved user at user.actions ', user);
  return {
    type:SAVE_USER,
    payload: firebaseService.saveUser(user, userId),
  };
}

function getAllUsers() {
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteUser(id) {

}
