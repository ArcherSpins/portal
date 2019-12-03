// @flow
import { combineReducers } from 'redux';
import jobsCurrentUser from './jobCurrentUser';

// $FlowFixMe
export default () => combineReducers({
  jobsCurrentUser,
});
