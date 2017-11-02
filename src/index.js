import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from './reducers/rootReducer';
import App from './App';
import './style/index.css';

const defaultState = {};
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <div>
    <Provider store={createStoreWithMiddleware(rootReducer, defaultState)}>
        <App />
    </Provider>

    </div>,
  document.getElementById('kslo')
);
