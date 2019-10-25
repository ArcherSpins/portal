// @flow
import type { RouterHistory } from 'react-router-dom';
import taskActionTypes from './task.types';
import type { TaskCreation, Dispatch } from './task.flow-types';
import { clearErrors } from '../error/error.actions';
import {
  createTask as CreateTask,
  updateTask,
  deleteTask as emoveTask,
} from '../../graphql/mutations/task.mutations';
import { getAllTasks } from '../../graphql/queries/task.queries';

export const setTaskLoading = () => ({
  type: 'SET_TASK_LOADING',
});

export const createTask = (task: TaskCreation, history: RouterHistory) => (
  dispatch: Dispatch,
) => {
  dispatch(clearErrors());
  dispatch(setTaskLoading());
  CreateTask(task)
    .then((response) => {
      dispatch({
        type: 'CREATE_TASK',
        payload: response.data.createTask,
      });
      history.goBack();
    })
    .catch((error) => {
      dispatch({
        type: 'GET_ERRORS',
        payload: error.graphQLErrors[0],
      });
    });
};

export const editTask = (newTask: TaskCreation, history: RouterHistory) => (
  dispatch: Dispatch,
) => {
  dispatch(clearErrors());
  dispatch(setTaskLoading());
  updateTask(newTask)
    .then((response) => {
      dispatch({
        type: taskActionTypes.EDIT_TASK,
        payload: response.data.updateTask,
      });
      history.goBack();
    })
    .catch((error) => dispatch({
      type: 'GET_ERRORS',
      payload: error.graphQLErrors[0],
    }));
};

export const getTasks = (milestoneID: string) => (dispatch: Dispatch) => {
  dispatch(setTaskLoading());
  getAllTasks(milestoneID).then((response) => dispatch({
    type: 'GET_TASKS',
    payload: response.data.tasks.tasks,
  }));
};

// export const deleteTaskByMilestone = (milestoneId: string): TaskAction => ({
//   type: taskActionTypes.DELETE_TASK_BY_MILESTONE,
//   payload: milestoneId
// });

export const deleteTask = (taskId: string, history: RouterHistory) => (
  dispatch: Dispatch,
) => {
  dispatch(clearErrors());
  dispatch(setTaskLoading());
  emoveTask(taskId)
    .then((response) => {
      dispatch({
        type: 'DELETE_TASK',
        payload: response.data.deleteTask,
      });
      history.goBack();
    })
    .catch((error) => dispatch({
      type: 'GET_ERRORS',
      payload: error.graphQLErrors[0],
    }));
};


export const getTaskStatuses = () => ({
  type: taskActionTypes.GET_TASKS_STATUSES_REQUEST,
});
