import { userConstants } from '../consatants';

const { REGISTER_USER } = userConstants.REGISTER_USER;
const initialState = {
  isPending: false,
  isFulfilled: false,
  isError: false,
  registeredUser: {},
};

export default function registration(state = initialState, action) {
  switch (action.type) {
    case `${REGISTER_USER}_PENDING`:
      return {
        ...state,
        isFulfilled: false,
        isPending: true,
      };

    case `${REGISTER_USER}_FULFILLED`:
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        registeredUser: action.payload,
      };

    case `${REGISTER_USER}_REJECTED`:
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
