export function getDays(findDays, daysWeek, dateValue) {
  return findDays
    .split(',')
    .reduce((obj, item, idx) => {
      const date = new Date(dateValue.getFullYear(), dateValue.getMonth(), Number(item.replace(/\*|\+/, '')));
      console.log(
        daysWeek[Number(date.getDay())], daysWeek,
      );
      if (daysWeek[Number(date.getDay())] !== 'Sunday' && daysWeek[Number(date.getDay())] !== 'Saturday') {
        return (
          {
            ...obj,
            [idx]: new Date(dateValue.getFullYear(), dateValue.getMonth(), Number(item)),
          }
        );
      }
      return obj;
    }, {});
}

export function getStylesDate(findDays) {
  return findDays
    .split(',')
    .reduce((obj, item, idx) => (
      {
        ...obj,
        [idx]: {
          color: '#7dd28c',
        },
      }), {});
}

export const MONTH_ARRAY = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

export const daysWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];


export const getModify = (calendar, dateValue) => {
  const modify = {
    days: {},
    modifiersStyles: {},
  };
  if (calendar) {
    const findDays = calendar[MONTH_ARRAY[dateValue.getMonth()]];
    modify.days = getDays(findDays, daysWeek, dateValue);
    modify.modifiersStyles = getStylesDate(findDays);
  }
  return modify;
};
