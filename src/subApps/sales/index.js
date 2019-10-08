import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

import { App } from './containers';

const store = configureStore();

const SubApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default SubApp;
