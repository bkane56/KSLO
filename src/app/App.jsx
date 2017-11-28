import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute } from '../components';
import Main from '../containers/main';
import { LoginPage } from '../components/login/loginPage';
import { RegisterPage } from '../components/login/registerPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    const appClass = `App ${this.props.flightCategory}`;
    return (
      <div className={appClass}>
        <div className="container">
          <div className="col-sm-10 col-sm-offset-1">
            {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
              <div>
                <PrivateRoute exact path="/" component={Main} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
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
  return { alert, flightCategory };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
