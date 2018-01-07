import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { auth } from '../../utils/fire';
import '../../style/style.css';
import { history } from '../../helpers';
import { routesConstants } from '../../consatants';
import { userActions } from '../../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  submitted: false,
};
class LoginPage extends React.Component {
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
    this.setState({ submitted: true });
    const {
      email,
      password,
    } = this.state;
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routesConstants.MAIN);
      }).catch((error) => {
        this.setState(this.handleChange('error', error));
      });
  }

  render() {
    const { email, password, submitted } = this.state;
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
  return bindActionCreators({ getUser }, dispatch);
}
const connectedLoginPage = connect(null, mapDispatchToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
