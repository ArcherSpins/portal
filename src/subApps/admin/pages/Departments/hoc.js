import { connect } from 'react-redux';
import { compose } from 'redux';
import { requestAllDepartments, closeErrorMessage } from '../../redux/actions';

const mapStateToProps = (state) => ({
  departments: state.departments.departments,
  loading: state.departments.loading,
  errorStatus: state.app.errorStatus,
  errorMessage: state.app.errorMessage,
});

const mapDispatchToProps = {
  requestAllDepartments,
  closeErrorMessage,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
);
