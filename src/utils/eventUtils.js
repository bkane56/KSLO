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


export const eventUtils = { compileEventList };
