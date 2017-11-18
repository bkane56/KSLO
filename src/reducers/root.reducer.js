import { combineReducers } from 'redux';
import MetarReducer from './metar.reducer';

const reducers = {
  metar: MetarReducer,
};
const rootReducer = combineReducers(reducers);

export default rootReducer;
