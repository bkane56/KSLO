import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notifications, { notify } from 'react-notify-toast';
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';

import DisplayModal from './displayModal';
import HeaderMetar from './headerMetar';
import '../style/App.css';
import '../style/calendar.css';
import { calculateDensityAltitude } from '../utils/metarUtils';
import { eventUtils } from '../utils';
import { eventActions, userActions } from '../actions';
import { auth } from '../utils/fire';
import { firebaseService } from '../services';

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
  state = {
    openFirstModal: false,
    openSecondModal: false,
    slot: null,
  };

  constructor(props, context) {
    super(props, context);
    this.context = context;
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
    this.handleSetEventColor = this.handleSetEventColor.bind(this);
    this.toggleFirstModal = this.toggleFirstModal.bind(this);
  }

  componentDidMount() {
    const userID = auth.currentUser.uid;
    this.props.getUser(userID);
    this.props.getEvents(N_NUMBER);
    // this.props.addEventsFromFirebase(N_NUMBER);
  }

  toggleFirstModal() {
    this.setState({
      openFirstModal: !this.state.openFirstModal,
    });
  }

  toggleSecondModal() {
    this.setState({
      openSecondModal: !this.state.openSecondModal,
    });
  }

  handleSetEventColor() {
    if (this.props.cfiRequired) {
      return 'cfiRequired';
    }
    return 'test-class';
  }

  handleSelectEvent(props) {
    const myColor = { background: '#252885', text: '#2678FF' };
    notify.show(props.index, 'custom', 5000, myColor);
  }

  handleSelectSlot(slot) {
    const timeFromat = 'ddd MMM D HH:mm zz';
    const eventStart = Moment(slot.start).format();
    if (Moment(eventStart).isAfter(Moment()) && this.props.isAllowedToSchedule) {
      this.state.slot = slot;
      this.toggleFirstModal();
    }
  }

  showModal = (props) => {
    return <DisplayModal
      onClose={this.toggleFirstModal}
      title={this.props.username}
      nNumber={N_NUMBER}
      slot={this.state.slot}
    />
  };


  render() {
    const { openFirstModal, openSecondModal } = this.state;
    const {
      metarRawText, flightCategory, densityAlt, eventList, isAllowedToSchedule,
    } = this.props;
    const isSelectable = isAllowedToSchedule? "ignoreEvents" : false;
    const events = eventUtils.compileEventList(eventList);
    const minDate = new Date('2017, 1, 7, 06:00');
    const maxDate = new Date('2017, 1, 7, 23:59');
    const showModal = (openFirstModal) ? this.showModal(this.state.slot) : null;
    return (
      <div>
        <HeaderMetar
          metarRawText={metarRawText}
          flightCategory={flightCategory}
          densityAlt={densityAlt}
        />
        <div>
          { (openFirstModal) ? this.showModal(this.state.slot) : null }
        </div>
        <div className="Calendar transparent">
          <Notifications />
          <BigCalendar
            selectable={isSelectable}
            popup
            events={events}
            onSelectSlot={slot => this.handleSelectSlot(slot)}
            onSelectEvent={event => this.handleSelectEvent(event)}
            min={minDate}
            max={maxDate}
            views={['month', 'week', 'day', 'agenda']}
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
};

Planner.propTypes = {
  metarRawText: PropTypes.string,
  flightCategory: PropTypes.string,
  name: PropTypes.string,
  cfiRequired: PropTypes.bool,
  densityAlt: PropTypes.number,
  addEvents: PropTypes.func,
  getEvents: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  const { getEvents, addEvents, addEventsFromFirebase } = eventActions;
  const { getUser } = userActions;

  return bindActionCreators({
    getEvents, addEvents, getUser, addEventsFromFirebase
  }, dispatch);
}

function mapStateToProps(state) {
  const flightCategory = state.metar.data[0].flight_category;
  const metarRawText = state.metar.data[0].raw_text;
  const eventList = state.events.events;
  const densityAlt = calculateDensityAltitude(state.metar.data[0]);
  const { cfiRequired, isAllowedToSchedule, username } = state.users.data;

  const stuff = {
    flightCategory, metarRawText, eventList, densityAlt, cfiRequired, isAllowedToSchedule, username,
  };
  return stuff;
}

export default connect(mapStateToProps, mapDispatchToProps)(Planner);
