import { authConstants } from '../consatants';

function addAuth(authUser) {
  return {
    type: authConstants.AUTH_USER,
    payload: authUser,
  };
}

function removeAuth() {
  return {
    type: authConstants.UNAUTH_USER,
  };
}

export const authActions = {
  addAuth,
  removeAuth,
};
