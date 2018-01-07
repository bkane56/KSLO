import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import { store, configureFakeBackend } from './helpers';
import { App } from './app/App';

require('./style/index.css');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('kslo'),
);
