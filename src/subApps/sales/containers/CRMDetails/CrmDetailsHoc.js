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
  fetchCommentsAction,
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
} from '../../redux/actions';

const mapStateToProps = (state) => ({
  activeUser: state.detailsCrm.activeUser,
  contacts: state.detailsCrm.contacts,
  comments: state.detailsCrm.comments,
  activeManager: state.detailsCrm.activeManager,
  errorsFormCreate: state.errorFormCreate.errorsFormCreate,
  errorAlert: state.errorFormCreate.errorAlert,
  managers: state.employees.employees,
  loadingEmployees: state.employees.loading,
  statuses: state.column.columnsData,
  loadingColumns: state.column.loadingColumns,
  crm: state.deals.deals,
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
  fetchCommentsAction,
  fetchDealParametersAction,
  fetchDeleteContactAction,
  fetchUpdateDealAction,
  closeErrorAlert,
  fetchCreateDealAction,
  fetchCreateCommentAction,
  fetchCreateContactAction,
  fetchDeleteCommentAction,
  fetchUpdateCommentAction,
  fetchDeleteDealAction,
  fetchUpdateContactAction,
  getDealById,
};

// $FlowFixMe
export default compose(
  // $FlowFixMe
  connect(mapStateToProps, mapDispatchToProps),
);
