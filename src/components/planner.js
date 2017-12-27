import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { connect } from 'react-redux';
import Notifications, { notify } from 'react-notify-toast';
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
import HeaderMetar from '../components/headerMetar';
import '../style/App.css';
import '../style/calendar.css';

import { Events } from '../resources/events';
import events from '../reducers/events.reducer';


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(Moment));

class Planner extends Component {
  constructor(props, context) {
    super(props, context);
    this.context = context;
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.state = {
      events: Events,
    };
  }

  getCurrentDate() {
    return Moment().format('YYYY,MM,DD');
  }

  handleSelectEvent() {
    // just for example
    // console.log(`handleSelectEvent: ${JSON.stringify(arguments)}`);
    const myColor = { background: '#252885', text: '#2678FF' };
    notify.show(this.props.name, "custom", 5000, myColor);
  }

  handleSelectSlot({ start, end }) {
    // create an event with title "Test"
    this.state.events.push({ start, end, title: this.props.name });
    this.setState({});
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
        <HeaderMetar
          metar={metar}
          flightCategory={flightCategory}
        />
        <div className="Calendar transparent">
          <Notifications />
          <BigCalendar
            selectable
            popup
            events={this.state.events}
            onSelectSlot={this.handleSelectSlot}
            onSelectEvent={this.handleSelectEvent}
            min={new Date('2017, 1, 7, 06:00')}
            max={new Date('2017, 1, 7, 23:59')}
            views={['month', 'week', 'day']}
            defaultView='week'
            defaultDate={new Date(this.getCurrentDate())}
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

Planner.defaultProps = {
  metar: '',
  flightCategory: '',
};

Planner.propTypes = {
  metar: PropTypes.string,
  flightCategory: PropTypes.string,
};

function mapStateToProps(state) {
  const flightCategory = state.metar.data[0].flight_category;
  const metar = state.metar.data[0].raw_text;
  const { lastName, firstName, cfiRequired } = state.authentication.user;
  const name = `${lastName}, ${firstName}`;
  return {
    lastName, firstName, cfiRequired, name, flightCategory, metar,
  };
}

export default connect(mapStateToProps)(Planner);
