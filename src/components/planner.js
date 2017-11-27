import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import { connect } from 'react-redux';
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
import HeaderMetar from '../components/headerMetar';
import NavBar from '../components/navBar';
import '../style/App.css';
import '../style/calendar.css';

import { Events } from '../resources/events';


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(Moment));

class Planner extends Component {
  constructor(props, context) {
    super(props, context);
    this.context = context;
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
    this.state = {
      events: Events,
      currentDate: Moment().format('YYYY,MM,DD'),
    };
  }

  handleSelectSlot({ start, end}) {
    // create an event with title "Test"
    this.state.events.push({ start, end, title: this.props.name });
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
    const { metar, flightCategory } = this.props;
    return (
      <div>
        <NavBar />
        <HeaderMetar
          metar={metar}
          flightCategory={flightCategory}
        />
        <div className="Calendar">
          <BigCalendar
            selectable
            popup
            events={this.state.events}
            onSelectSlot={this.handleSelectSlot}
            onSelectEvent={this.handleSelectEvent}
            views={['month', 'week', 'day']}
            defaultDate={new Date(this.state.currentDate)}
            eventPropGetter={e => ({ className: 'test-class' })} /* Here you can define a style for the element */
            components={{
                event: this.EventWeek,
                agenda: {
                    event: this.EventAgenda,
                },
            }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const flightCategory = state.metar.data[0].flight_category;
  const metar = state.metar.data[0].raw_text;
  const { lastName, firstName } = state.authentication.user;
  const name = `${lastName}, ${firstName}`;
  return { lastName, firstName, name, flightCategory, metar };
}

export default connect(mapStateToProps)(Planner);
