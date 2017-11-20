import { eventsConstants } from '../consatants';
import { eventsServices } from '../services';

export default function getEvents() {
  return {
    type: eventsConstants.FETCH_EVENTS,
    payload: eventsServices.getEvents(),
  };
}
