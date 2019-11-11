import { connect } from 'react-redux';
import { compose } from 'redux';
import { requestAllDepartments } from '../../redux/actions';

const mapStateToProps = (state) => ({
  departments: state.departments.departments,
  loading: state.departments.loading,
});

const mapDispatchToProps = {
  requestAllDepartments,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
);
