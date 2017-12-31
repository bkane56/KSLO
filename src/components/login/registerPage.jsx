import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userActions } from '../../actions';
import { auth } from '../../utils/fire';
import '../../style/style.css';

const INITIAL_STATE = {
  user: {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    cfiRequired: true,
  },
  submitted: false,
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
    const {
      firstName,
      lastName,
      username,
      email,
      passwordOne,
      cfiRequired,
    } = this.state.user;
    auth.createUserAndRetrieveDataWithEmailAndPassword(email, passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      }).catch((error) => {
        this.setState(this.handleChange('error', error));
      });
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    const isInvalid = user.passwordOne !== user.passwordTwo || user.passwordOne === '' || user.passwordTwo === ''
      || user.email === '' || user.username === '' || user.firstName === '' || user.lastName === '';

    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={`form-group${submitted && !user.firstName ? ' has-error' : ''}`}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="form-control"
              name="firstName"
              value={user.firstName}
              onChange={
                event => this.setState(this.handleChange(event.target.name, event.target.value))
              }
            />
            {submitted && !user.firstName &&
              <div className="help-block">First Name is required</div>
            }
          </div>
          <div className={`form-group${submitted && !user.lastName ? ' has-error' : ''}`}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="form-control"
              name="lastName"
              value={user.lastName}
              onChange={
                event => this.setState(this.handleChange(event.target.name, event.target.value))
              }
            />
            {submitted && !user.lastName &&
            <div className="help-block">Last Name is required</div>
                        }
          </div>
          <div className={`form-group${submitted && !user.username ? ' has-error' : ''}`}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="User Name"
              className="form-control"
              name="username"
              value={user.username}
              onChange={
                event => this.setState(this.handleChange(event.target.name, event.target.value))
              }
            />
            {submitted && !user.username &&
            <div className="help-block">Username is required</div>
                        }
          </div>
          <div className={`form-group${submitted && !user.email ? ' has-error' : ''}`}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={
                event => this.setState(this.handleChange(event.target.name, event.target.value))
              }
            />
            {submitted && !user.username &&
            <div className="help-block">Username is required</div>
            }
          </div>
          <div className={`form-group${submitted && !user.passwordOne ? ' has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="passwordOne"
              value={user.passwordOne}
              onChange={
                event => this.setState(this.handleChange(event.target.name, event.target.value))
              }
            />
            {submitted && !user.passwordOne &&
            <div className="help-block">Password is required</div>
            }
          </div>
          <div className={`form-group${submitted && !user.passwordTwo ? ' has-error' : ''}`}>
            <label htmlFor="passwordTwo">Re-Enter Password</label>
            <input
              type="password"
              placeholder="Re-Enter Your Password"
              className="form-control"
              name="passwordTwo"
              value={user.passwordTwo}
              onChange={
                event => this.setState(this.handleChange(event.target.name, event.target.value))
              }
            />
            {submitted && !user.passwordTwo && (user.passwordOne !== user.passwordTwo) &&
            <div className="help-block">Password is required</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-primary" disabled={isInvalid}>Register</button>
            {registering &&
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
            <Link to="/landing" className="btn btn-link">Cancel</Link>
          </div>
          {this.displayErrorMessage()}
        </form>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  const { registerUser } = userActions;
  return bindActionCreators({ registerUser }, dispatch);
}
function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering,
  };
}

const connectedRegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
