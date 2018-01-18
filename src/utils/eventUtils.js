const compileEventList = (events) => {
  const eventList = [];
  if (events !== null && events !== []) {
    Object.keys(events).map((event) => {
      const index = event;
      const newEvent = {
        index: event,
        title: events[event].title,
        start: new Date(events[event].start),
        end: new Date(events[event].end),
        desc: events[event].desc,
        allDay: events[event].allDay,

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
