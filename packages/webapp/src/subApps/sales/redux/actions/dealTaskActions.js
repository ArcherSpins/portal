// @flow

export const fetchDealTypesRequest = () => ({
  type: 'GET_DEAL_TYPES_REQUEST',
});

export const fetchDealTypeIdRequest = (id: string) => ({
  type: 'GET_DEAL_TYPE_ID_REQUEST',
  payload: id,
});

export const fetchDealTasksRequest = (dealId: string) => ({
  type: 'GET_DEAL_TASKS_REQUEST',
  payload: dealId,
});

export const fetchCreateDealTask = (data: {
  dealID: string,
  typeID: string,
  description: string,
}) => ({
  type: 'CREATE_DEAL_TASK_REQUEST',
  payload: data,
});

export const fetchUpdateDealTask = (data: {
  id: string,
  resolveComment: string
}) => ({
  type: 'UPDATE_DEAL_TASK_REQUEST',
  payload: data,
});

export const fetchDealLogs = (data: {
  dealID: string
}) => ({
  type: 'GET_DEAL_LOGS_REQUEST',
  payload: data,
});
