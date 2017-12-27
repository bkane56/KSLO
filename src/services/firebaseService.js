import Moment from 'moment/moment';
import { eventsConstants } from '../consatants';


export const firebaseService = {
  saveEvent,
};

function saveEvent(db, slot, title, nNumber) {
  // create an event with title "Test"
  const dbCon = db.database().ref(`/events/${nNumber}`);
  dbCon.push({
    start: Moment(slot.start).format(eventsConstants.DATE_FORMAT),
    end: Moment(slot.end).format(eventsConstants.DATE_FORMAT),
    allDay: false,
    title,
    desc: 'solo',
  });
}
