import Moment from 'moment/moment';
import { eventsConstants } from '../consatants';
import fire from '../utils/fire';


export const firebaseService = {
  saveEvent,
};

function saveEvent(slot, title, nNumber) {
  // create an event with title "Test"
  fire.database().ref(`/events/${nNumber}`).push({
    start: Moment(slot.start).format(eventsConstants.DATE_FORMAT),
    end: Moment(slot.end).format(eventsConstants.DATE_FORMAT),
    allDay: false,
    title,
    desc: 'solo',
  });
}
