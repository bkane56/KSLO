import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { auth } from '../../utils/fire';
import '../../style/style.css';
import { history } from '../../helpers';
import { routesConstants } from '../../consatants';
import { authActions, userActions } from '../../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  submitted: false,
};
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.displayErrorMessage = this.displayErrorMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  displayErrorMessage() {
    if (this.state.error !== null) {
      return (
        <div >
          <div className="firebaseError">
            { this.state.error.message }
          </div>
        </div>
      );
    }
    return null;
  }

  handleChange(propertyName, value) {
    return { [propertyName]: value };
  }

  handleSubmit(event) {
    const {
      email,
      password,
    } = this.state;
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.addAuth(auth.currentUser);
        this.setState(() => ({ ...INITIAL_STATE }));
      }).catch((error) => {
        this.setState(this.handleChange('error', error));
      });
    this.setState({ submitted: true });
  }

  render() {
    const { email, password, submitted } = this.state;
    const { isAuthenticated } = this.props;
    const { redirectLocation } = this.props.location ||
          { redirectLocation: { pathname: routesConstants.MAIN } };
    if (isAuthenticated) {
      return <Redirect to={redirectLocation} />;
    }
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
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
  const { getUser } = userActions;
  const { addAuth } = authActions;
  return bindActionCreators({ getUser, addAuth }, dispatch);
}

function mapStateToProps(state) {
  const { isAuthenticated } = state.authentication;
  return { isAuthenticated };
}
const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
