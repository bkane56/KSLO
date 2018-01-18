import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { eventActions, userActions } from '../actions';
import { routesConstants } from '../consatants';

class ScheduleConfirmation extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(propertyName, value) {
    return { [propertyName]: value };
  }

  handleSubmit() {
    return null;
  }

  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <div>
          <h1>Please Confirm Reservation</h1>
          <h3>Will be a form soon</h3>
        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const { getEvents, addEvents } = eventActions;
  const { getUser } = userActions;

  return bindActionCreators({
    getEvents, addEvents, getUser,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(ScheduleConfirmation);
