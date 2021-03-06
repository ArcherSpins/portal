// @flow
import { reorderCards } from '../../redux/actions/reorderCardsCrm';
import {
  getDealsAction,
  getColumnsDataAction,
  getEmployeesAction,
} from '../../redux/actions';
import { fetchSelfInfoAction } from '../../redux/actions/detailsActions';
import {
  updateDealReorderAction,
} from '../../redux/actions/deals';

export const mapStateToProps = (state: any) => ({
  columnOrder: state.column.columnOrder,
  columns: state.column.columns,
  loadingColumns: state.column.loadingColumns,
  columnData: state.column.columnsData,
  dealsData: state.deals.deals,
  loadingDeals: state.deals.loadingDeals,
  activeUser: state.detailsCrm.activeUser,
  activeManager: state.detailsCrm.activeManager,
});

export const mapDispatchToProps = {
  reorderCards,
  getDealsAction,
  getColumnsDataAction,
  updateDealReorderAction,
  getEmployeesAction,
  fetchSelfInfoAction,
};
