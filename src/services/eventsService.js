import { eventsConstants } from '../consatants';

const jsonFile = require('jsonfile');

export const eventsServices = {
  getEvents,
};

function getEvents() {
  return jsonFile.readFile(eventsConstants.EVENTS_URL);
}
