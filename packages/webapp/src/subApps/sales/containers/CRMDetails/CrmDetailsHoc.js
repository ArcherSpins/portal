/* eslint-disable react/no-unused-state */
// @flow
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  setActiveUser,
  setContactsDeal,
  setCommentAction,
  updateCommentAction,
  setActiveManagerAction,
  fetchSelfInfoAction,
  fetchChannelsAction,
  fetchSourcesAction,
  fetchDealParametersAction,
  fetchDeleteContactAction,
  fetchUpdateDealAction,
  fetchCreateDealAction,
  fetchCreateCommentAction,
  fetchCreateContactAction,
  fetchDeleteCommentAction,
  fetchUpdateCommentAction,
  fetchDeleteDealAction,
  fetchUpdateContactAction,
} from '../../redux/actions/detailsActions';
import {
  setErrorForm,
  deleteErrorForm,
  closeErrorAlert,
} from '../../redux/actions/errorFormCreate';
import { startCreateNewDeal } from '../../redux/actions/createCrm';
import {
  getEmployeesAction,
  getColumnsDataAction,
  getDealsAction,
  getDealById,
  fetchDealTypesRequest,
  fetchDealTypeIdRequest,
  fetchDealTasksRequest,
  getCalendarData,
  fetchCreateDealTask,
  fetchUpdateDealTask,
  fetchDealLogs,
} from '../../redux/actions';

const mapStateToProps = (state) => ({
  activeUser: state.detailsCrm.activeUser,
  contacts: state.detailsCrm.contacts,
  comments: state.detailsCrm.comments,
  dealTypes: state.deals.dealTypes,
  logDeals: state.detailsCrm.logDeals,
  activeManager: state.detailsCrm.activeManager,
  errorsFormCreate: state.errorFormCreate.errorsFormCreate,
  errorAlert: state.errorFormCreate.errorAlert,
  managers: state.employees.employees,
  loadingEmployees: state.employees.loading,
  statuses: state.column.columnsData,
  loadingColumns: state.column.loadingColumns,
  crm: state.deals.deals,
  dealTasks: state.deals.dealTasks,
  loadingDeals: state.deals.loadingDeals,
  loadingById: state.deals.loadingById,
  loadingChannels: state.detailsCrm.loadingChannels,
  loadingSources: state.detailsCrm.loadingSources,
  sources: state.detailsCrm.sources,
  channels: state.detailsCrm.channels,
  loadingComments: state.detailsCrm.loadingComments,
});

const mapDispatchToProps = {
  setActiveUser,
  setContactsDeal,
  updateCommentAction,
  setActiveManagerAction,
  startCreateNewDeal,
  setErrorForm,
  deleteErrorForm,
  setCommentAction,
  fetchSelfInfoAction,
  getEmployeesAction,
  getColumnsDataAction,
  getDealsAction,
  fetchChannelsAction,
  fetchSourcesAction,
  fetchDealParametersAction,
  fetchDeleteContactAction,
  fetchUpdateDealAction,
  fetchCreateDealTask,
  closeErrorAlert,
  fetchCreateDealAction,
  fetchCreateCommentAction,
  fetchCreateContactAction,
  fetchDeleteCommentAction,
  fetchUpdateCommentAction,
  fetchDeleteDealAction,
  fetchUpdateContactAction,
  getDealById,
  fetchDealTypesRequest,
  fetchDealTypeIdRequest,
  fetchDealTasksRequest,
  getCalendarData,
  fetchUpdateDealTask,
  fetchDealLogs,
};

// $FlowFixMe
export default compose(
  // $FlowFixMe
  connect(mapStateToProps, mapDispatchToProps),
);
