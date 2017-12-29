import { eventsConstants } from '../consatants';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isError: false,
  events: {},
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case eventsConstants.FETCH_EVENTS_PENDING:
      return {
        ...state,
        isFulfilled: false,
        isPending: true,
      };

    case eventsConstants.FETCH_EVENTS_FULFILLED:

      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        events: action.payload,
      };

    case eventsConstants.FETCH_EVENTS_REJECTED:
      return {
        ...state,
        isFulfilled: false,
        isPending: false,
        isError: true,
      };

    case eventsConstants.ADD_EVENTS_PENDING:
      return {
        ...state,
        isFulfilled: false,
        isPending: true,
      };

    case eventsConstants.ADD_EVENTS_FULFILLED:
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
      };

    case eventsConstants.ADD_EVENTS_REJECTED:
      return {
        isFulfilled: false,
        isPending: false,
        isError: true,
        state,
      };

    case eventsConstants.DELETE_EVENT:
      return {};

    default:
      return state;
  }
}
