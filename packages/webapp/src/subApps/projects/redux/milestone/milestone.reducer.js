// @flow
import type { MilestoneState, MilestoneAction } from './milestone.flow-types';

const INITIAL_STATE = {
  milestones: [],
  loading: false,
};

const milestoneReducer = (
  state: MilestoneState = INITIAL_STATE,
  action: MilestoneAction,
): MilestoneState => {
  switch (action.type) {
    case 'SET_MILESTONE_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'CREATE_MILESTONE':
      return {
        ...state,
        loading: false,
        milestones: [action.payload, ...state.milestones],
      };
    case 'EDIT_MILESTONE':
      return {
        ...state,
        milestones: state.milestones.map((milestone) => {
          if (milestone.id === action.payload.id) {
            return action.payload;
          }
          return milestone;
        }),
        loading: false,
      };
    case 'DELETE_MILESTONE':
      return {
        ...state,
        milestones: state.milestones.filter(
          (milestone) => milestone.id !== action.payload,
        ),
      };
    case 'GET_ALL_MILESTONES':
      return {
        ...state,
        milestones: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default milestoneReducer;
