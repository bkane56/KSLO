import { userConstants } from '../consatants';

const {
  FETCH_USER, SAVE_USER, LOGIN_USER,
} = userConstants;
const initialState = {
  isPending: false,
  isFulfilled: false,
  isError: false,
  data: {},
};
export default function users(state = initialState, action) {
  switch (action.type) {
    case `${SAVE_USER}_PENDING`:
      return {
        ...state,
        isFulfilled: false,
        isPending: true,
      };
    case `${SAVE_USER}_FULFILLED`:
      console.log('reducer fulfilled payload ', action.payload);
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        user: action.payload,
      };

    case `${SAVE_USER}_REJECTED`:
      return {
        ...state,
        isFulfilled: false,
        isPending: false,
        isError: true,
      };

    case `${FETCH_USER}_PENDING`:
      return {
        ...state,
        isFulfilled: false,
        isPending: true,
      };
    case `${FETCH_USER}_FULFILLED`:
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        data: action.payload,
      };

    case `${FETCH_USER}_REJECTED`:
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
