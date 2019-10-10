// @flow
import { combineReducers } from 'redux';
import user from './user';
import employees from './employees';
import departments from './departments';
import position from './position';
import calendar from './calendar';
import app from './app';
import spentTimeBounds from './spentTimeBounds';
import city from './cities';

// $FlowFixMe
export default () => combineReducers({
  user,
  employees,
  departments,
  position,
  calendar,
  app,
  spentTimeBounds,
  city,
});
