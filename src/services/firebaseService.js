import Moment from 'moment/moment';
import { eventsConstants } from '../consatants';
import fire from '../utils/fire';

function getEvents(nNumber) {
  // get a list of events from Firebase
  // return fire.database().ref(`/events/${nNumber}`).once('value');
  const ref = fire.database().ref(`/events/${nNumber}`);
  return ref.once('value').then(function(snapshot){
    return snapshot.val();
  });
}

function saveEvent(slot, title, nNumber) {
  // const startTime = Moment(slot.start)
  // startTime.subtract(1, 'months');
  // console.log('dec should = 11 ', startTime.get('month'));
  // save an event to firebase
  fire.database().ref(`/events/${nNumber}`).push({
    start: Moment(slot.start).format(eventsConstants.DATE_FORMAT),
    end: Moment(slot.end).format(eventsConstants.DATE_FORMAT),
    allDay: false,
    title,
    desc: 'solo',
  });
}

export const firebaseService = {
  saveEvent,
  getEvents,
};
