import { eventsConstants } from '../consatants';

const { ADD_EVENTS_FROM_FIREBASE, FETCH_EVENTS, ADD_EVENTS } = eventsConstants;
const initialState = {
  isPending: false,
  isFulfilled: false,
  isError: false,
  events: [],
};

export default function events(state = initialState, action) {
  console.log('action into reducer', action)
  switch (action.type) {
    // case `${FETCH_EVENTS}_PENDING`:
    //   return {
    //     ...state,
    //     isFulfilled: false,
    //     isPending: true,
    //   };

    case FETCH_EVENTS:
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        events: action.payload,
      };

    // case `${FETCH_EVENTS}_REJECTED`:
    //   return {
    //     ...state,
    //     isFulfilled: false,
    //     isPending: false,
    //     isError: true,
    //   };

    case `${ADD_EVENTS}_PENDING`:
      return {
        ...state,
        isFulfilled: false,
        isPending: true,
      };

    case `${ADD_EVENTS}_FULFILLED`:
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
      };

    case `${ADD_EVENTS}_REJECTED`:
      return {
        isFulfilled: false,
        isPending: false,
        isError: true,
        state,
      };
    case `${ADD_EVENTS_FROM_FIREBASE}_PENDING`:
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
      };

    case `${ADD_EVENTS_FROM_FIREBASE}_FULFILLED`:
      console.table(action.payload)
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        events: action.payload,
      };

    case `${ADD_EVENTS_FROM_FIREBASE}_REJECTED`:
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
      };

    case eventsConstants.DELETE_EVENT:
      return {};

    default:
      return state;
  }
}
