// @flow
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reorderCards } from '../../redux/actions/reorderCardsCrm';
import {
  getDealsAction,
  getColumnsDataAction,
  getEmployeesAction,
} from '../../redux/actions';
import {
  updateDealReorderAction,
} from '../../redux/actions/deals';

const mapStateToProps = (state) => ({
  columnOrder: state.column.columnOrder,
  columns: state.column.columns,
  loadingColumns: state.column.loadingColumns,
  columnData: state.column.columnsData,
  dealsData: state.deals.deals,
  loadingDeals: state.deals.loadingDeals,
});

const mapDispatchToProps = {
  reorderCards,
  getDealsAction,
  getColumnsDataAction,
  updateDealReorderAction,
  getEmployeesAction,
};

// TODO: FIX THIS
// $FlowFixMe
export default compose(
  // $FlowFixMe
  connect(mapStateToProps, mapDispatchToProps),
);
