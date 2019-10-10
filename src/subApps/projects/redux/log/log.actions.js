// @flow
import type { RouterHistory } from 'react-router-dom';
import logTypes from './log.types';
import type { LogCreation, Dispatch } from './log.flow-types';
import { clearErrors } from '../error/error.actions';
import {
  createLog as CreateLog,
  updateLog,
} from '../../graphql/mutations/log.mutations';
import { getLogs } from '../../graphql/queries/log.queries';

export const setLogLoading = () => ({
  type: 'SET_LOG_LOADING',
});

export const createLog = (log: LogCreation, history: RouterHistory) => (
  dispatch: Dispatch,
) => {
  dispatch(clearErrors());
  dispatch(setLogLoading());
  CreateLog(log)
    .then((response) => {
      dispatch({
        type: logTypes.CREATE_LOG,
        payload: response.data.createSpentTimeEntry,
      });
      history.goBack();
    })
    .catch((error) => dispatch({
      type: 'GET_ERRORS',
      payload: error.graphQLErrors[0],
    }));
};

export const getAllLogs = (taskID: string) => (dispatch: Dispatch) => {
  dispatch(setLogLoading());
  getLogs(taskID)
    .then((response) => dispatch({
      type: 'GET_ALL_LOGS',
      payload: response.data.tasksSpentTimeEntries.spentTimeEntries,
    }))
    .catch(() => dispatch({
      type: 'GET_ALL_LOGS',
      payload: [],
    }));
};

export const editLog = (log: LogCreation, history: RouterHistory) => (
  dispatch: Dispatch,
) => {
  dispatch(clearErrors());
  dispatch(setLogLoading());
  updateLog(log)
    .then((response) => {
      dispatch({
        type: 'EDIT_LOG',
        payload: response.data.updateSpentTimeEntry,
      });
      history.goBack();
    })
    .catch((error) => dispatch({
      type: 'GET_ERRORS',
      payload: error.graphQLErrors[0],
    }));
};

// export const deleteLogByMilestone = (milestoneId: string) => ({
//   type: logTypes.DELETE_LOG_BY_MILESTONE,
//   payload: milestoneId
// });
