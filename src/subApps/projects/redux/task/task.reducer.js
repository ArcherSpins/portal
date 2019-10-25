// @flow
import type { TaskState, TaskAction } from './task.flow-types';
import TaskActionTypes from './task.types';

const INITIAL_STATE = {
  tasks: [],
  loading: false,
  statuses: [],
};

const taskReducer = (
  state: TaskState = INITIAL_STATE,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
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

    case TaskActionTypes.GET_TASKS_STATUSES_SUCCESS:
      return {
        ...state,
        statuses: action.payload,
      };

    default:
      return state;
  }
};

export default taskReducer;
