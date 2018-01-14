import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {eventActions, userActions} from "../actions";
import {routesConstants} from "../consatants";

class ScheduleConfirmation extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(propertyName, value) {
    return { [propertyName]: value };
  }

  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Please Confirm Reservation</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={`form-group${submitted && !email ? ' has-error' : ''}`}>
            <label htmlFor="username">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={
                event => this.setState(this.handleChange(event.target.name, event.target.value))
              }
            />
            {submitted && !email &&
            <div className="help-block">Username is required</div>
            }
          </div>
          <div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={
                event => this.setState(this.handleChange(event.target.name, event.target.value))
              }
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
            <Link to={routesConstants.REGISTER_PAGE} className="btn btn-link">Register</Link>
          </div>
          {this.displayErrorMessage()}
        </form>
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