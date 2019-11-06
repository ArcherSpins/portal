/*eslint-disable */
export const taskAddCount = (taskToAdd, tasks) => {
  const filtertasks = tasks.filter(
    task => task.milestoneId === taskToAdd.milestoneId
  );

  if (!filtertasks.length) {
    return [{ ...taskToAdd, count: 1 }, ...tasks];
  }
    return [{ ...taskToAdd, count: filtertasks.length + 1 }, ...tasks];
};
