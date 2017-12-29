import { eventsConstants } from '../consatants';
import { eventsServices, firebaseService } from '../services';

function getEvents(nNumber) {
  return {
    type: eventsConstants.FETCH_EVENTS,
    payload: firebaseService.getEvents(nNumber),
  };
}

function addEvents(slot, title, nNumber) {
  console.log('event_action_add',slot, title, nNumber);
  return {
    type: eventsConstants.ADD_EVENTS,
    payload: firebaseService.saveEvent(slot, title, nNumber),
  };
}

export const eventActions = {
  getEvents,
  addEvents,
};
