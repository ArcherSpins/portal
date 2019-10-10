// @flow
import type { TaskState, TaskAction } from './task.flow-types';

const INITIAL_STATE = {
  tasks: [],
  loading: false,
};

const taskReducer = (
  state: TaskState = INITIAL_STATE,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    default:
      return state;
    case 'SET_TASK_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'CREATE_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading: false,
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          }
          return task;
        }),
        loading: false,
      };
    case 'GET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    // case "DELETE_TASK_BY_MILESTONE":
    //   return {
    //     ...state,
    //     tasks: state.tasks.filter(task => task.milestoneId !== action.payload)
    //   };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
  }
};

export default taskReducer;
