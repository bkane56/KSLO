import { authConstants } from '../consatants';

const { AUTH_USER, UNAUTH_USER } = authConstants;
const initialState =
  {
    isPending: false,
    isFulfilled: false,
    isError: false,
    isAuthenticated: false,
    authUser: {
      displayName: '',
      uid: '',
      photoURL: '',
      email: '',
    },
  };
export default function authentication(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        isAuthenticated: true,
        authUser: {
          status: action.payload.status,
          error: action.payload.error,
          displayName: action.payload.displayName,
          uid: action.payload.uid,
          photoURL: action.payload.photoURL,
          email: action.payload.email,
        },
      };

    case UNAUTH_USER:
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        isAuthenticated: false,
        authUser: {
          displayName: '',
          uid: '',
          photoURL: '',
          email: '',
        },
      };

    default: {
      return state;
    }
  }
}
