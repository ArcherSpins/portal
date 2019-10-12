// @flow
import { createSelector } from 'reselect';
import type { State } from '../flow-state';
import type { Project } from './project.flow-types';

type Props = {
  match: Object
};

const selectProject = (state: State) => state.project.projects;
const selectProjectLoading = (state: State) => state.project.loading;
const selectProjectId = (state: State, ownProps: Props) => ownProps.match.params.projectId;

export const selectProjectLoadingBool = createSelector<
  State,
  *,
  *,
  *,
  *,
  *,
  *,
  *,
  *
>(
  [selectProjectLoading],
  (loading) => loading,
);

export const selectProjectItem = createSelector<State, *, *, *, *, *, *, *, *>(
  [selectProject, selectProjectId],
  (projects: Array<Project>, projectId: string) => projects.find(
    (project) => project.URL === `http://projects.internal.sfxdx.ru/${projectId}`,
  ),
);

export const selectAllProjects = createSelector<State, *, *, *, *, *, *, *, *>(
  [selectProject],
  (projects: Array<Project>) => projects,
);
