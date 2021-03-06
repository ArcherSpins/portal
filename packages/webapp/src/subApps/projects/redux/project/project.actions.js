// @flow
import type { RouterHistory } from 'react-router-dom';
import type { ProjectCreation, Dispatch } from './project.flow-types';
import {
  updateProject,
  createProject,
} from '../../graphql/mutations/project.mutations';
import { projects } from '../../graphql/queries/project.queries';
import * as routes from '../../routes';
import projectActionTypes from './project.types';

export const setProjectLoading = () => ({
  type: 'SET_PROJECT_LOADING',
});

export const getProjectTypes = () => ({
  type: projectActionTypes.GET_PROJECT_TYPES_REQUEST,
});

export const getAllProjects = () => (dispatch: Dispatch) => {
  dispatch(setProjectLoading());
  projects().then((response) => {
    dispatch({
      type: 'GET_ALL_PROJECTS',
      payload: response.data.projects.projects,
    });
  });
  // .catch(() =>
  //   dispatch({
  //     type: "GET_ALL_PROJECTS",
  //     payload: []
  //   })
  // );
};

export const editProject = (
  projectToEdit: ProjectCreation,
  history: RouterHistory,
  // eslint-disable-next-line no-unused-vars
) => (dispatch: Dispatch) => {
  dispatch(setProjectLoading());
  updateProject(projectToEdit).then((response) => {
    dispatch({
      type: 'EDIT_PROJECT',
      payload: response.data.updateProject,
    });
    history.push(routes.ROOT);
  });
  // .catch(() => {
  //   return dispatch({
  //     type: "EDIT_PROJECT",
  //     payload: {}
  //   });
  // });
};

export const saveProject = (
  newProject: ProjectCreation,
  history: RouterHistory,
) => (dispatch: Dispatch) => {
  dispatch(setProjectLoading());
  createProject(newProject).then((response) => {
    dispatch({
      type: 'SAVE_PROJECT',
      payload: response.data.createProject,
    });
    history.push(routes.ROOT);
  });
  // .catch(() =>
  //   dispatch({
  //     type: projectActionTypes.SAVE_PROJECT,
  //     payload: {}
  //   })
  // );
};
