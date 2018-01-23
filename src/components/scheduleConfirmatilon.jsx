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
  handleEditDescription = () => {
    this.props.onClose();
  }

  addDescription = () => {
    console.table(this.props)
  }

  handleClick = () => {
    console.table(this.props);
    const desc = 'Just going to clear my brain';
    this.props.addEvents(this.props.slot, this.props.title, desc, this.props.nNumber);
    this.props.onClose();
  };

  render() {
    const timeFromat = 'ddd MMM D HH:mm zz';
    const { title, nNumber } = this.props;
    const start = Moment(this.props.slot.start).format(timeFromat);
    const end = Moment(this.props.slot.end).format(timeFromat);
    return (
      <div className="col-md-6 col-md-offset-3">
        <div>
          <h1>Please Confirm Reservation</h1>
          <hr />
          <div>
            <h3>Name: {title} </h3>
            <hr />
            <h3>Start Time: {start} </h3>
            <hr />
            <h3>Ending Time: {end} </h3>
            <hr />
            <h3>Description: (optional)
                <a href="#" onClick={this.handleEditDescription}> Add Description </a>
            </h3>
            <button onClick={this.handleClick}>
              Confirm
            </button>
          </div>
        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const { addEvents } = eventActions;
  const { getUser } = userActions;

  return bindActionCreators({
    addEvents, getUser,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(ScheduleConfirmation);
