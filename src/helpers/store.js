import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();
export const store = createStore(
  rootReducer,
  applyMiddleware(
    loggerMiddleware,
    promise(),
    thunkMiddleware,
  ),
);
