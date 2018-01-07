import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authActions, userActions } from '../../actions';
import { auth } from '../../utils/fire';
import '../../style/style.css';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  userType: '',
  passwordOne: '',
  passwordTwo: '',
  isAllowedToSchedule: true,
  cfiRequired: true,
  submitted: false,
  error: null,
};

class RegisterPage extends React.Component {
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
    event.preventDefault();
    this.setState({ submitted: true });
    const savedUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      cfiRequired: this.state.cfiRequired,
      isAllowedToSchedule: this.state.isAllowedToSchedule,
      email: this.state.email,
      userType: 'admin',
    };

    const {
      email,
      passwordOne,
    } = this.state;

    auth.createUserAndRetrieveDataWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        this.setState(() => ({ ...INITIAL_STATE }));
        const userID = auth.currentUser.uid;
        this.props.saveUser(savedUser, userID);
        this.props.addAuth(auth.currentUser);
      }).catch((error) => {
        this.setState(this.handleChange('error', error));
      });
  }

  render() {
    const {
      firstName, lastName, username, email, passwordOne, passwordTwo, submitted,
    } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || passwordTwo === ''
      || email === '' || username === '' || firstName === '' || lastName === '' || email === '';

    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={`form-group${submitted && !firstName ? ' has-error' : ''}`}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="form-control"
              name="firstName"
              value={firstName}
              onChange={
                event => this.setState(this.handleChange(event.target.name, event.target.value))
              }
            />
            {submitted && !firstName &&
              <div className="help-block">First Name is required</div>
            }
          </div>
          <div className={`form-group${submitted && !lastName ? ' has-error' : ''}`}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="form-control"
              name="lastName"
              value={lastName}
              onChange={
                event => this.setState(this.handleChange(event.target.name, event.target.value))
              }
            />
            {submitted && !lastName &&
            <div className="help-block">Last Name is required</div>
                        }
          </div>
          <div className={`form-group${submitted && !username ? ' has-error' : ''}`}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="User Name"
              className="form-control"
              name="username"
              value={username}
              onChange={
                event => this.setState(this.handleChange(event.target.name, event.target.value))
              }
            />
            {submitted && !username &&
            <div className="help-block">Username is required</div>
                        }
          </div>
          <div className={`form-group${submitted && !email ? ' has-error' : ''}`}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              name="email"
              value={email}
              onChange={
                event => this.setState(this.handleChange(event.target.name, event.target.value))
              }
            />
            {submitted && !username &&
            <div className="help-block">Username is required</div>
            }
          </div>
          <div className={`form-group${submitted && !passwordOne ? ' has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="passwordOne"
              value={passwordOne}
              onChange={
                event => this.setState(this.handleChange(event.target.name, event.target.value))
              }
            />
            {submitted && !passwordOne &&
            <div className="help-block">Password is required</div>
            }
          </div>
          <div className={`form-group${submitted && !passwordTwo ? ' has-error' : ''}`}>
            <label htmlFor="passwordTwo">Re-Enter Password</label>
            <input
              type="password"
              placeholder="Re-Enter Your Password"
              className="form-control"
              name="passwordTwo"
              value={passwordTwo}
              onChange={
                event => this.setState(this.handleChange(event.target.name, event.target.value))
              }
            />
            {submitted && !passwordTwo && (passwordOne !== passwordTwo) &&
            <div className="help-block">Password is required</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-primary" disabled={isInvalid}>Register</button>
            {registering &&
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
            <Link to="/landing" className="btn btn-link">Cancel</Link>
          </div>
          {this.displayErrorMessage()}
        </form>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  const { saveUser } = userActions;
  const { addAuth } = authActions;
  return bindActionCreators({ saveUser, addAuth }, dispatch);
}


const connectedRegisterPage = connect(null, mapDispatchToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
