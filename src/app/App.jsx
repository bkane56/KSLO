import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../helpers';

import Main from '../containers/main';
import NavBar from '../components/navBar';
import { LoginPage } from '../components/login/loginPage';
import { RegisterPage } from '../components/login/registerPage';
import LandingPage from '../components/landingPage';
import ForgotPassword from '../components/forgotPassword';
import Account from '../components/account';
import { routesConstants } from '../consatants';
import { firebase, auth } from '../utils/fire';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: false,
      count: 1,
    };
  }
  componentDidMount() {
    let { aUser } = this.props;
    auth.onAuthStateChanged((authUser) => {
      aUser = !!authUser;

      this.setState(() => ({ authUser }));
      console.log('logged in CDM? ', aUser);
      // console.log('count in CDM? ', this.state.count);
    });
  }
  render() {
    const { alert, aUser } = this.props;
    const appClass = `App ${this.props.flightCategory}`;
    console.log('logged in render? ', aUser);
    return (
      <div className={appClass}>
        <div className="container">
          <div className="col-sm-10 col-sm-offset-1">
            {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history} >
              <div>
                <NavBar authUser={this.state.authUser} />
                <hr />
                <Route
                  exact
                  path={routesConstants.LANDING}
                  component={() => <LandingPage />}
                />
                <Route
                  exact
                  path={routesConstants.REGISTER_PAGE}
                  component={() => <RegisterPage />}
                />
                <Route
                  exact
                  path={routesConstants.LOGIN_PAGE}
                  component={() => <LoginPage />}
                />
                <Route
                  exact
                  path={routesConstants.FORGOT_PASSWORD}
                  component={() => <ForgotPassword />}
                />
                <Route
                  exact
                  path={routesConstants.MAIN}
                  component={() => <Main />}
                />
                <Route
                  exact
                  path={routesConstants.ACCOUNT}
                  component={() => <Account />}
                />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  const flightCategory = state.metar.data[0].flight_category;
  const aUser = null;
  return { alert, flightCategory, aUser };
}
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
