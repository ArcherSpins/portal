// @flow
import { createSelector } from 'reselect';
import type { State } from '../flow-state';
import type { Log } from './log.flow-types';

type Props = {
  match: Object,
  task: Object,
  id: string
};

const selectLogs = (state: State) => state.log.logs;
// const selectTaskId = (state: State, ownProps: Props) =>
//   ownProps.match.params.taskId;
const selectLogId = (state: State, ownProps: Props) => ownProps.match.params.logId;
const selectTaskIdByProps = (state: State, ownProps: Props) => ownProps.match.params.taskId;
// const selectProjectId = (state: State, ownProps: Props) =>
//   ownProps.match.params.projectId;
// const selectProjectItemId = (state: State, ownProps: Props) => ownProps.id;

// export const selectAllLogs = createSelector<State, *, *, *, *, *, *, *, *>(
//   [(selectLogs: Function), (selectTaskId: Function)],
//   (logs: Array<Log>, taskId: string) =>
//     logs.filter(log => log.taskId === taskId)
// );

export const selectLogByLogId = createSelector<State, *, *, *, *, *, *, *, *>(
  [selectLogs, selectLogId],
  (logs: Array<Log>, logId: string) => logs.find((log) => log.id === logId),
);

export const selectAllLogsByTaskIdProps = createSelector<State, *, *, *, *, *, *, *, *>(
  [selectLogs, selectTaskIdByProps],
  (logs: Array<Log>, taskId: string) => logs.filter(
    (log) => log.task.number === parseFloat(taskId.substring(4)),
  ),
);

export const selectAllLogs = createSelector<State, *, *, *, *, *, *, *, *>(
  [selectLogs],
  (logs) => logs,
);

// export const selectLogsByProjectId = createSelector<State, *, *, *, *, *, *, *, *>(
//   [selectLogs, selectProjectId],
//   (logs: Array<Log>, projectId: string) =>
//     logs.filter(log => log.projectId === projectId)
// );

// export const selectLogsByProjectId2 = createSelector<State, *, *, *, *, *, *, *, *>(
//   [selectLogs, selectProjectItemId],
//   (logs: Array<Log>, projectId: string) =>
//     logs.filter(log => log.projectId === projectId)
// );
