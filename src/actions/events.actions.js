import { eventsConstants } from '../consatants';
import { eventsServices, firebaseService } from '../services';

function getEvents(nNumber) {
  return {
    type: eventsConstants.FETCH_EVENTS,
    payload: {
      promise: firebaseService.getEvents(nNumber),
    },
  };
}

function addEvents(slot, title, desc, nNumber) {
  return {
    type: eventsConstants.ADD_EVENTS,
    payload: firebaseService.saveEvent(slot, title, desc, nNumber),
  };
}

export const eventActions = {
  getEvents,
  addEvents,
};
