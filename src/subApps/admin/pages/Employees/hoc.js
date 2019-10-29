// @flow
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  requestEmployees,
  checkTokenAction,
} from '../../redux/actions';
import {
  searchEmployees,
} from '../../redux/actions/app';

const mapStateToProps = (state) => ({
  employees: state.employees.employees,
  count: state.employees.count,
  loadingEmployees: state.employees.loadingEmployees,
  loadingUser: state.user.loadingUser,
  userData: state.user.userData,
  search: state.app.searchEmployees,
});

const mapDispatchToProps = {
  checkTokenAction,
  requestEmployees,
  searchEmployees,
};
// TODO: FIX THIS
// $FlowFixMe
export default compose(
  // $FlowFixMe
  connect(mapStateToProps, mapDispatchToProps),
);
