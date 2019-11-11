// @flow
import { createSelector } from 'reselect';
import type { Match } from 'react-router-dom';
import type { State } from '../flow-state';
import type { Task } from './task.flow-types';

type Props = {
  match: Match
};

const selectTask = (state: State) => state.task.tasks;
const selectTaskId = (state: State, ownProps: Props) => ownProps.match.params.taskId;
const selectTaskStates = (state: State) => state.task.statuses;


export const selectAllTasks = createSelector<State, *, *, *, *, *, *, *, *>(
  [selectTask],
  (tasks) => tasks,
);

export const selectTaskByParams = createSelector<State, *, *, *, *, *, *, *, *>(
  // TODO: FIX THIS
  // $FlowFixMe
  [selectTask, selectTaskId],
  (tasks: Array<Task>, taskId: string) => tasks.find(
    (task) => task.number === parseFloat(taskId.substring(4)),
  ),
);

// $FlowFixMe
export const selectTaskStatuses = createSelector(
  [selectTaskStates],
  (statuses) => statuses.map((st) => ({ value: st.id, label: st.title })),
);
