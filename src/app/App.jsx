import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
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
import { auth } from '../utils/fire';

function AuthenticatedRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (isAuthenticated === true
        ? <Component {...props} {...rest} />
        : <Redirect to={{ pathname: 'loginPage', state: { redirectLocation: props.location } }} />)}
    />
  );
}


class App extends React.Component {
  render() {
    const { flightCategory, isAuthenticated } = this.props;
    let category = flightCategory;
    if (category === 'LIFR') {
      category = 'IFR';
    }
    const appClass = `App ${category}`;
    return (
      <div className={appClass}>
        <div className="container">
          <div className="col-sm-10 col-sm-offset-1">
            <Router history={history} >
              <div>
                <NavBar authUser={isAuthenticated} />
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
                <AuthenticatedRoute
                  exact
                  path={routesConstants.FORGOT_PASSWORD}
                  isAuthenticated={isAuthenticated}
                  component={() => <ForgotPassword />}
                />
                <AuthenticatedRoute
                  exact
                  path={routesConstants.MAIN}
                  isAuthenticated={isAuthenticated}
                  component={() => <Main />}
                />
                <AuthenticatedRoute
                  exact
                  path={routesConstants.ACCOUNT}
                  isAuthenticated={isAuthenticated}
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
  const { isAuthenticated } = state.authentication;
  return { alert, flightCategory, isAuthenticated };
}
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
