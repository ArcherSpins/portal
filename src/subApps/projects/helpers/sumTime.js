/*eslint-disable */
export const minutesToHours = logs => {
  let hoursToReturn = 0;

  logs.forEach(log => {
    const hours = parseFloat(log.minutes) / 60;
    hoursToReturn = hoursToReturn + Math.floor(hours);
  });

  return parseFloat(hoursToReturn);
};

export const convertToMinutes = hours => {
  const minutes = parseFloat(hours) * 60;
  return minutes;
};

export const spentTimeInHours = spentTime => {
  let hours = 0;
  let minutes = 0;
  if(spentTime >= 60) {
    hours = spentTime / 60;
    hours = Math.floor(hours)
    minutes = spentTime % 60;
    if(minutes == 0) {
      return `${hours}` 
    }
    minutes = (minutes / 60) * 10
    minutes = Math.floor(minutes)
    return `${hours}.${minutes}` 
  } else if (spentTime == 0) {
    return 0
  }
  minutes = (spentTime / 60) * 10;
  minutes = Math.ceil(minutes)
  return `${hours}.${minutes}`
}

export const sumHours = logs => {
  let hoursToReturn = 0;

  logs.forEach(log => {
    hoursToReturn = hoursToReturn + parseFloat(log.hours);
  });

  return parseFloat(hoursToReturn);
};

export const sumMilestonesHours = milestones => {
  let hoursToReturn = 0;

  milestones.forEach(milestone => {
    hoursToReturn = hoursToReturn + parseFloat(milestone.spent);
  });

  return hoursToReturn;
};

export const logEditHours = time => {
  const hours = time / 60;
  const floor = Math.floor(hours)
  if(floor >= 0 && floor <= 10) {
    return `0${floor}`;
  } else {
    return floor
  }
};

export const logEditMinutes = time => {
  const minutes = time % 60;
  if(minutes >= 0 && minutes < 10) {
    return `0${minutes}`;
  } else {
    return minutes
  }
}
