import createBaseRoute from 'utils/createRouteNames';

const getRoute = createBaseRoute('projects');

export const ROOT = getRoute('');
export const USER_PICKER_ROUTE = getRoute('/userPicker');
export const CREATE_PROJECT_ROUTE = getRoute('/create');
export const PROJECT_DETAILS_ROUTE = getRoute('/:projectId');
export const MILESTONES_ROUTE = `${PROJECT_DETAILS_ROUTE}/milestones`;
export const TASKS_ROUTE = `${MILESTONES_ROUTE}/:milestoneId/tasks`;
export const TASK_ADD_ROUTE = `${TASKS_ROUTE}/create`;
export const TASK_DETAILS_ROUTE = `${TASKS_ROUTE}/:taskId`;
export const LOG_HISTORY_ROUTE = `${TASK_DETAILS_ROUTE}/logs`;
export const LOG_EDIT_ROUTE = `${LOG_HISTORY_ROUTE}/:logId`;
export const LOG_CREATE_ROUTE = `${LOG_HISTORY_ROUTE}/logcreate`;
export const MILESTONE_ADD_ROUTE = `${MILESTONES_ROUTE}/create`;
export const MILESTONE_DETAILS_ROUTE = `${MILESTONES_ROUTE}/:milestoneId`;
