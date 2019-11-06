// @flow
import { combineReducers } from 'redux';
import detailsCrm from './detailsCrm';
import errorFormCreate from './errorsFormCreate';

import deals from './deal';
import column from './column';
import employees from './employees';

// $FlowFixMe
export default () => combineReducers({
  detailsCrm,
  errorFormCreate,
  deals,
  column,
  employees,
});
