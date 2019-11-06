import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import history from 'utils/history';
import client from 'utils/api';

import App from 'main/containers/App';
import * as serviceWorker from './serviceWorker';

import '@sfxdx/ui-kit/assets/css/main.css';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <App />
    </Router>
  </ApolloProvider>, MOUNT_NODE,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
