import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';

const mapStateToProps = (state) => ({
  error: state.errors.message,
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(Sidebar);
