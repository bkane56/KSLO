import { combineReducers } from 'redux';
import MetarReducer from './metarReducer';

    const reducers = {
        metar: MetarReducer
    };
    const rootReducer = combineReducers(reducers);

export default rootReducer;
