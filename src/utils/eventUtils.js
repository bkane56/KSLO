const compileEventList = (events) => {
  const eventList = [];
  if (events !== null && events !== []) {
    events.map((event) => {
      const newEvent = {
        eventId: event.eventId,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        desc: event.desc,
        allDay: event.allDay,
      };
      eventList.push(newEvent);
      return null;
    });
  }
  return eventList;
};

const compileListFromFirebase = (eventsObject) => {
  const listOfEvents = [];
  eventsObject.map((event) => {
    const newEvent = {
      eventId: event.eventId,
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      desc: event.desc,
      allDay: event.allDay,
    };
    listOfEvents.push(event);
  });
  return listOfEvents;
};

export const eventUtils = { compileEventList, compileListFromFirebase };
