import { eventsConstants } from '../consatants';
import { eventsServices, firebaseService } from '../services';

function getEvents() {
  return {
    type: eventsConstants.FETCH_EVENTS,
    payload: eventsServices.getEvents(),
  };
}

function addEvents(slot, title, nNumber) {
  return {
    type: eventsConstants.ADD_EVENTS,
    payload: firebaseService.saveEvent(slot, title, nNumber),
  };
}

export const eventActions = {
  getEvents,
  addEvents,
};
