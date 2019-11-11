/*eslint-disable */
export const logAddCount = (logToAdd, logs) => {
  const filterlogs = logs.filter(log => log.taskId === logToAdd.taskId);

  if (!filterlogs.length) {
    return [{ ...logToAdd, count: 1 }, ...logs];
  } 
    return [{ ...logToAdd, count: filterlogs.length + 1 }, ...logs];
};
