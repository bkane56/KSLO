import { eventsConstants } from '../consatants';
import { firebaseService } from '../services';
import { fireDB } from '../utils/fire';

function getEvents(nNumber) {
  const ref = fireDB.database().ref(`/events/${nNumber}`);
  return (dispatch) => {
    ref.on('value', (snapshot) => {
      dispatch({
        type: eventsConstants.FETCH_EVENTS,
        payload: snapshot.val(),
      });
    });
  };
}


function addEvents(slot, title, desc, nNumber) {
  return {
    type: eventsConstants.ADD_EVENTS,
    payload: firebaseService.saveEvent(slot, title, desc, nNumber),
  };
}

function addEventsFromFirebase(nNumber) {
  return {
    type: eventsConstants.ADD_EVENTS_FROM_FIREBASE,
    payload: firebaseService.addListenersForEvents(nNumber),
  };
}

export const eventActions = {
  getEvents,
  addEvents,
  addEventsFromFirebase,
};
