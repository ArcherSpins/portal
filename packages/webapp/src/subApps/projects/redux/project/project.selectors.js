// @flow
import { createSelector } from 'reselect';
import type { State } from '../flow-state';
import type { Project, ProjectType } from './project.flow-types';

import { getUrlFromProject } from '../../helpers';

type Props = {
  match: Object
};

const selectProject = (state: State) => state.project.projects;
const selectProjectLoading = (state: State) => state.project.loading;
const selectProjectId = (state: State, ownProps: Props) => ownProps.match.params.projectId;
const getProjectTypes = (state: State) => state.project.projectTypes;
const getEngagementModels = (state: State) => state.project.engagementModels;

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
    (project) => getUrlFromProject(project.URL) === projectId,
  ),
);

export const selectAllProjects = createSelector<State, *, *, *, *, *, *, *, *>(
  [selectProject],
  (projects: Array<Project>) => projects,
);

// $FlowFixMe
export const selectProjectTypes = createSelector(
  [getProjectTypes],
  (projectTypes: Array<ProjectType>) => projectTypes,
);

// $FlowFixMe
export const selectEngagementModels = createSelector(
  [getEngagementModels],
  (engagementModels: Array<ProjectType>) => engagementModels,
);
