import { combineReducers } from 'redux';

import authentication from './authentication.reducer';
import registration from './registration.reducer';
import users from './users.reducer';
import alert from './alert.reducer';
import metar from './metar.reducer';
import events from './events.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  metar,
  events,
});

export default rootReducer;
