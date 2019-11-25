import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './redux/store';

const initialState = {};
const store = configureStore(initialState);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
