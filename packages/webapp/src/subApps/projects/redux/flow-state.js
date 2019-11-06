// @flow
import type { LogState } from './log/log.flow-types';
import type { ErrorState } from './error/error.flow-types';
import type { MilestoneState } from './milestone/milestone.flow-types';
import type { ProjectState } from './project/project.flow-types';
import type { TaskState } from './task/task.flow-types';

export type State = {
  project: ProjectState,
  milestone: MilestoneState,
  task: TaskState,
  log: LogState,
  error: ErrorState
};
