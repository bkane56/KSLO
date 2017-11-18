import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();
export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    ReduxPromise,
  ),
);
