import { userConstants } from '../consatants';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isError: false,
  registeredUser: {},
};

export default function registration(state = initialState, action) {
  console.log('registration reducer', action.payload);
  switch (action.type) {
    case userConstants.REGISTER_USER_PENDING:
      return {
        ...state,
        isFulfilled: false,
        isPending: true,
      };

    case userConstants.REGISTER_USER_FULFILLED:
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        registeredUser: action.payload,
      };

    case userConstants.REGISTER_USER_REJECTED:
      return {
        ...state,
        isFulfilled: false,
        isPending: false,
        isError: true,
      };

    default:
      return state;
  }
}
