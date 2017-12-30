import { eventsConstants } from '../consatants';

const jsonFile = require('jsonfile');


function getEvents() {
  return jsonFile.readFile(eventsConstants.EVENTS_URL);
}

export const eventsServices = {
  getEvents,

};
