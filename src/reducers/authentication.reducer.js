import { userConstants } from '../consatants';

const user = (JSON.parse(localStorage.getItem('user')) !== null) ? JSON.parse(localStorage.getItem('user')) :
  {};
const defaultState = user ? { loggedIn: true, user } : {};

export default function authentication(state = defaultState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };

    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };

    case userConstants.LOGIN_FAILURE:
      return {};

    case userConstants.LOGOUT:
      return {};

    default:
      return state;
  }
}
