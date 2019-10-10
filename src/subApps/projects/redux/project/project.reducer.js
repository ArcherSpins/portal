// @flow
import type { ProjectState, ProjectAction } from './project.flow-types';

const initialState = {
  projects: [],
  loading: false,
};

const projectReducer = (
  state: ProjectState = initialState,
  action: ProjectAction,
): ProjectState => {
  switch (action.type) {
    case 'SET_PROJECT_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'GET_ALL_PROJECTS':
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };
    case 'SAVE_PROJECT':
      return {
        ...state,
        loading: false,
        projects: [action.payload, ...state.projects],
      };
    case 'EDIT_PROJECT':
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload.id) {
            return action.payload;
          }
          return project;
        }),
        loading: false,
      };
    default:
      return state;
  }
};

export default projectReducer;
