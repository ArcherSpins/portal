// @flow
import { createSelector } from 'reselect';
import type { State } from '../flow-state';
import type { Milestone } from './milestone.flow-types';
import { getUrlFromProject } from '../../helpers';

type Props = {
  match: Object,
  id: string
};

const selectMilestone = (state: State) => state.milestone.milestones;
const selectProjectIdByParams = (state: State, ownProps: Props) => ownProps.match.params.projectId;
// const selectProjectItemId = (state: State, ownProps: Props) => ownProps.id;
const selectMilestoneId = (state: State, ownProps: Props) => ownProps.match.params.milestoneId;

export const selectProjectsMolestones = createSelector<
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
  [selectMilestone, selectProjectIdByParams],
  (milestones: Array<Milestone>, projectId: string) => milestones.filter(
    (milestone) => getUrlFromProject(milestone.project.URL) === `${projectId}`,
  ),
);

export const selectMilestoneByParams = createSelector<
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
  [selectMilestone, selectMilestoneId],
  (milestones: Array<Milestone>, milestoneId: string) => milestones.find(
    (milestone) => milestone.number === parseFloat(milestoneId.substring(9)),
  ),
);
