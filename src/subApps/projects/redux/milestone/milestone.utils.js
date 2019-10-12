/*eslint-disable */
export const milestoneAddCount = (milestoneToAdd, milestones) => {
  const filterMilestones = milestones.filter(
    milestone => milestone.projectId === milestoneToAdd.projectId
  );

  if (!filterMilestones.length) {
    return [{ ...milestoneToAdd, count: 1 }, ...milestones];
  } 
    return [
      { ...milestoneToAdd, count: filterMilestones.length + 1 },
      ...milestones
    ];
};
