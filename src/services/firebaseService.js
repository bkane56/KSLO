import Moment from 'moment/moment';
import { eventsConstants } from '../consatants';
import fire from '../utils/fire';

function getEvents(nNumber) {
  // get a list of events from Firebase
  // return fire.database().ref(`/events/${nNumber}`).once('value');
  const ref = fire.database().ref(`/events/${nNumber}`);
  return ref.once('value').then(snapshot => Object.values(snapshot.val()));
}

function saveEvent(slot, title, desc, nNumber) {
  // save an event to firebase

  fire.database().ref(`/events/${nNumber}`).push({
    start: Moment(slot.start).format(),
    end: Moment(slot.end).format(),
    allDay: false,
    title,
    desc,
  });
}

export const firebaseService = {
  saveEvent,
  getEvents,
};
