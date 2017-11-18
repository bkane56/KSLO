import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import '../style/App.css';
import '../style/calendar.css';
import { Events } from '../resources/events';


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(Moment));

export default class Planner extends Component {
  constructor(props, context) {
    super(props, context);
    this.context = context;
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
    this.state = { events: Events };
  }

  handleSelectSlot({ start, end }) {
    // create an event with title "Test"
    this.state.events.push({ start, end, title: 'Test' });
    this.setState({});
  }

  handleSelectEvent() {
    // just for example
    console.log(`handleSelectEvent: ${JSON.stringify(arguments)}`);
  }

  EventWeek(props) {
    return <strong>{props.event.title}</strong>;
  }

  EventAgenda(props) {
    return <em>{props.event.title}</em>;
  }

  render() {
    return (
      <div className="Calendar">
        <BigCalendar
          selectable
          popup
          events={this.state.events}
          onSelectSlot={this.handleSelectSlot}
          onSelectEvent={this.handleSelectEvent}
          views={['month', 'week', 'day']}
          defaultDate={new Date(2017, 11, 1)}
          eventPropGetter={e => ({ className: 'test-class' })} /* Here you can define a style for the element */
          components={{
                        event: this.EventWeek,
                        agenda: {
                            event: this.EventAgenda,
                        },
                    }}
        />
      </div>);
  }
}
