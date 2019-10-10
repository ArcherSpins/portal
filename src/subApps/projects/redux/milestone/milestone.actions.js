// @flow
import type { RouterHistory } from 'react-router-dom';
import milestoneActionTypes from './milestone.types';
import { clearErrors } from '../error/error.actions';
import { getMilestones } from '../../graphql/queries/milestone.queries';
import {
  createMilestone as saveMilestone,
  updateMilestone,
  deleteMilestone as emoveMilestone,
} from '../../graphql/mutations/milestones.mutation';
import type { MilestoneCreation, Dispatch } from './milestone.flow-types';

export const setMilestoneLoading = () => ({
  type: 'SET_MILESTONE_LOADING',
});

export const getAllMilestones = (projectID: String) => (dispatch: Dispatch) => {
  dispatch(clearErrors());
  dispatch(setMilestoneLoading());
  getMilestones(projectID)
    .then((response) => dispatch({
      type: 'GET_ALL_MILESTONES',
      payload: response.data.milestones.milestones,
    }))
    .catch((error) => dispatch({
      type: 'GET_ERRORS',
      payload: error.graphQLErrors[0],
    }));
};

export const createMilestone = (
  newMilestone: MilestoneCreation,
  history: RouterHistory,
) => (dispatch: Dispatch) => {
  dispatch(clearErrors());
  dispatch(setMilestoneLoading());
  saveMilestone(newMilestone)
    .then((response) => {
      dispatch({
        type: 'CREATE_MILESTONE',
        payload: response.data.createMilestone,
      });
      history.goBack();
    })
    .catch((error) => dispatch({
      type: 'GET_ERRORS',
      payload: error.graphQLErrors[0],
    }));
};

export const editMilestone = (
  milestoneToEdit: MilestoneCreation,
  history: RouterHistory,
) => (dispatch: Dispatch) => {
  dispatch(clearErrors());
  dispatch(setMilestoneLoading());
  updateMilestone(milestoneToEdit)
    .then((response) => {
      dispatch({
        type: milestoneActionTypes.EDIT_MILESTONE,
        payload: response.data.updateMilestone,
      });
      history.goBack();
    })
    .catch((error) => dispatch({
      type: 'GET_ERRORS',
      payload: error.graphQLErrors[0],
    }));
};

export const deleteMilestone = (id: string, pushTo: () => void) => (
  dispatch: Dispatch,
) => {
  emoveMilestone(id).then((response) => {
    dispatch({
      type: milestoneActionTypes.DELETE_MILESTONE,
      payload: response.data.deleteMilestone,
    });
    pushTo();
  });
};
