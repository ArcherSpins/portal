/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from 'utils/history';

export default () => combineReducers({
  router: connectRouter(history),
  // place your reducers here
});
