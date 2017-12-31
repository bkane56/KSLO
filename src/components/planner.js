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
import { compileEventList } from '../utils/eventUtils';
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
    this.handleSetEventColor = this.handleSetEventColor.bind(this);
    this.addLocalSlot = this.addLocalSlot.bind(this);
    // this.state = {
    //   events: Events,
    // };
  }

  componentWillMount() {
    // this.props.getEvents('N4SW');
  }


  handleSetEventColor() {
    if (this.props.cfiRequired) {
      return 'cfiRequired';
    }
    return 'test-class';
  }

  addLocalSlot({ start, end }) {
    this.state.events.push({
      start,
      end,
      title: this.props.name,
      desc: 'quick trip around',
    });
    this.setState({});
  }

  handleSelectEvent() {
    const myColor = { background: '#252885', text: '#2678FF' };
    notify.show(this.props.name, 'custom', 5000, myColor);
  }

  handleSelectSlot(slot) {
    const eventStart = Moment(slot.start).format();
    const nNumber = 'N4SW';
    if (Moment(eventStart).isAfter(Moment())) {
      const title = this.props.name;
      const desc = 'solo';
      this.props.addEvents(slot, title, desc, nNumber);
      // this.addLocalSlot(start, end);
    }
  }

  render() {
    const { metar, flightCategory, eventList } = this.props;
    const events = compileEventList(eventList);
    const minDate = new Date('2017, 1, 7, 06:00');
    const maxDate = new Date('2017, 1, 7, 23:59');
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
  metar: '',
  flightCategory: '',
  name: '',
  cfiRequired: true,
  addEvents() {},
  getEvents() {},
};

Planner.propTypes = {
  metar: PropTypes.string,
  flightCategory: PropTypes.string,
  name: PropTypes.string,
  cfiRequired: PropTypes.bool,
  addEvents: PropTypes.func,
  getEvents: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  const { getEvents, addEvents } = eventActions;
  return bindActionCreators({ getEvents, addEvents }, dispatch);
}

function mapStateToProps(state) {
  const flightCategory = state.metar.data[0].flight_category;
  const metar = state.metar.data[0].raw_text;
  const eventList = state.events.events;
  return {
    flightCategory, metar, eventList,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Planner);
