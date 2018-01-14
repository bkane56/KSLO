import { eventsConstants } from '../consatants';
import { eventsServices, firebaseService } from '../services';

function getEvents(nNumber) {
  return {
    type: eventsConstants.FETCH_EVENTS,
    payload: firebaseService.fetchEvents(nNumber),
  };
}

function addEvents(slot, title, desc, nNumber) {
  return {
    type: eventsConstants.ADD_EVENTS,
    payload: firebaseService.saveEvent(slot, title, desc, nNumber),
  };
}

function addEventsFromFirebase(eventList) {
  return {
    type: eventsConstants.ADD_EVENTS_FROM_FIREBASE,
    payload: new Promise(resolve => {eventList}  ),
  };
}

export const eventActions = {
  getEvents,
  addEvents,
  addEventsFromFirebase,
};
