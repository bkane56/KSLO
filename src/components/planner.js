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
import { calculateDensityAltitude } from '../utils/metarUtils';
import { compileEventList } from '../utils/eventUtils';
import { eventActions, userActions } from '../actions';
import { auth, fireDB } from '../utils/fire';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(Moment));
const N_NUMBER = 'N4SW';

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
    this.handleSetEventColor = this.handleSetEventColor.bind(this);
    this.addLocalSlot = this.addLocalSlot.bind(this);
    this.upDateNow = this.upDateNow.bind(this);
  }

  componentDidMount() {
    const userID = auth.currentUser.uid;
    this.props.getUser(userID);
    this.props.getEvents(N_NUMBER);
  }

  handleSetEventColor() {
    if (this.props.cfiRequired) {
      return 'cfiRequired';
    }
    return 'test-class';
  }

  upDateNow() {
    this.forceUpdate();
  }

  addLocalSlot({ start, end }) {
    this.state.events.push({
      start,
      end,
      title: this.props.name,
      desc: 'quick trip around',
    });
  }

  handleSelectEvent() {
    const myColor = { background: '#252885', text: '#2678FF' };
    notify.show(this.props.name, 'custom', 5000, myColor);
  }

  handleSelectSlot(slot) {
    const eventStart = Moment(slot.start).format();
    if (Moment(eventStart).isAfter(Moment()) && this.props.isAllowedToSchedule) {
      const title = this.props.username;
      const desc = 'solo';
      this.props.addEvents(slot, title, desc, N_NUMBER);
      this.props.getEvents(N_NUMBER);
    }
  }

  render() {
    console.log('N_NUMBER: ', N_NUMBER);
    const {
      metarRawText, flightCategory, densityAlt, eventList,
    } = this.props;
    const events = compileEventList(eventList);
    const minDate = new Date('2017, 1, 7, 06:00');
    const maxDate = new Date('2017, 1, 7, 23:59');
    return (
      <div>
        <HeaderMetar
          metarRawText={metarRawText}
          flightCategory={flightCategory}
          densityAlt={densityAlt}
        />
        <div className="Calendar transparent">
          <Notifications />
          <BigCalendar
            selectable
            popup
            events={events}
            onSelectSlot={slot => this.handleSelectSlot(slot)}
            onSelectEvent={this.handleSelectEvent}
            min={minDate}
            max={maxDate}
            views={['month', 'week', 'day']}
            defaultView="week"
            defaultDate={new Date(Planner.getCurrentDate())}
            eventPropGetter={e => ({ className: 'test-class' })} /* Here you can define a style for the element */
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
  metarRawText: '',
  flightCategory: '',
  densityAlt: 0,
  name: '',
  cfiRequired: true,
  addEvents() {},
  getEvents() {},
  setEvents() {},
};

Planner.propTypes = {
  metarRawText: PropTypes.string,
  flightCategory: PropTypes.string,
  name: PropTypes.string,
  cfiRequired: PropTypes.bool,
  densityAlt: PropTypes.number,
  addEvents: PropTypes.func,
  getEvents: PropTypes.func,
  setEvents: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  const { getEvents, addEvents } = eventActions;
  const { getUser } = userActions;
  return bindActionCreators({
    getEvents, addEvents, getUser,
  }, dispatch);
}

function mapStateToProps(state) {
  const flightCategory = state.metar.data[0].flight_category;
  const metarRawText = state.metar.data[0].raw_text;
  const eventList = state.events.events;
  const densityAlt = calculateDensityAltitude(state.metar.data[0]);
  const { cfiRequired, isAllowedToSchedule, username } = state.users.data;

  return {
    flightCategory, metarRawText, eventList, densityAlt, cfiRequired, isAllowedToSchedule, username,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Planner);
