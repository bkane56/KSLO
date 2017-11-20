import { eventsConstants } from '../consatants';

const defaultState = {
  events: [
    {
      title: 'Test',
      allDay: true,
      start: new Date(2017, 10, 22, 19, 0, 0),
      end: 'new Date(2017, 10, 22, 22, 30, 0)',
      desc: '',
    },
  ],
};

export default function events(state = defaultState, action) {
  switch (action.type) {
    case eventsConstants.FETCH_EVENTS:
      return {
        events: action.payload,
      }
    case eventsConstants.ADD_EVENTS:
      return {};

    case eventsConstants.DELETE_EVENT:
      return {};

    default:
      return state;
  }
}
