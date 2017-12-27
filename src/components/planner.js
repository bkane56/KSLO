import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notifications, { notify } from 'react-notify-toast';
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
import HeaderMetar from '../components/headerMetar';
import '../style/App.css';
import '../style/calendar.css';
import { Events } from '../resources/events';
import { eventActions } from '../actions';


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(Moment));

class Planner extends Component {
  static getCurrentDate() {
    return Moment().format('YYYY,MM,DD');
  }

  static EventWeek(props) {
    return <strong>{props.event.title}</strong>;
  }

  static EventAgenda(props) {
    return <em>{props.event.title}</em>;
  }

  constructor(props, context) {
    super(props, context);
    this.context = context;
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
    this.handlesetEventColor = this.handlesetEventColor.bind(this);
    Planner.getCurrentDate = Planner.getCurrentDate.bind(this);
    this.state = {
      events: Events,
    };
  }

  handlesetEventColor() {
    if (this.props.cfiRequired) {
      return 'cfiRequired';
    }
    return 'test-class';
  }

  handleSelectEvent() {
    // just for example
    // console.log(`handleSelectEvent: ${JSON.stringify(arguments)}`);
    const myColor = { background: '#252885', text: '#2678FF' };
    notify.show(this.props.name, 'custom', 5000, myColor);
  }

  handleSelectSlot(slot) {
    const eventStart = Moment(slot.start).format();
    const nNumber = 'N4SW';
    if (Moment(eventStart).isAfter(Moment())) {
      const title = this.props.name;
      const desc = 'solo';
      this.props.addEvents(slot, title, nNumber);
      this.state.events.push({
        start,
        end,
        title,
        desc,
      });
      this.setState({});
    }
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
            onSelectSlot={(slot, start, end) => this.handleSelectSlot(slot, start, end)}
            onSelectEvent={this.handleSelectEvent}
            min={new Date('2017, 1, 7, 06:00')}
            max={new Date('2017, 1, 7, 23:59')}
            views={['month', 'week', 'day']}
            defaultView="week"
            defaultDate={new Date(Planner.getCurrentDate())}
            eventPropGetter={e => ({ className: this.handlesetEventColor() })} /* Here you can define a style for the element */
            components={{
                event: Planner.EventWeek,
                agenda: {
                    event: Planner.EventAgenda,
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
  name: '',
  cfiRequired: true,
  addEvents() {},
};

Planner.propTypes = {
  metar: PropTypes.string,
  flightCategory: PropTypes.string,
  name: PropTypes.string,
  cfiRequired: PropTypes.bool,
  addEvents: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  const { getEvents, addEvents } = eventActions;
  return bindActionCreators({ getEvents, addEvents }, dispatch);
}

function mapStateToProps(state) {
  const flightCategory = state.metar.data[0].flight_category;
  const metar = state.metar.data[0].raw_text;
  const { lastName, firstName, cfiRequired } = state.authentication.user;
  const name = `${lastName}, ${firstName}`;
  return {
    lastName, firstName, cfiRequired, name, flightCategory, metar,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Planner);
