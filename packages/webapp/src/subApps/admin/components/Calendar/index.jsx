/* eslint-disable react/no-array-index-key */
// @flow
import React from 'react';
import {
  eachDayOfInterval,
  getMonth,
// $FlowFixMe
} from 'date-fns';
import {
  Calendar,
} from 'okami';
import Monthly from './Monthly';
import { ChooseYear } from '..';
import { Wrap } from './styled';

const getAllMonthsOfGivenYear = (year: number) => {
  const allDays = eachDayOfInterval(
    { start: new Date(year, 0, 1), end: new Date(parseInt(year, 10) + 1, 0, 1) },
  );

  const allMonths = allDays
    .reduce((acc, day) => {
      const month = getMonth(day);

      if (acc.find((existedDay) => existedDay.month === month)) {
        return acc;
      }
      return [...acc, { month: getMonth(day), date: day }];
    }, [])
    .map((date) => date.date);

  return allMonths;
};

type CalendarType = {
  currentYear: number,
  data: {
    [string]: string
  },
  changeYear: (string) => void
}

function getYears(currentYear) {
  return [
    { year: '2019' },
  ].map((obj) => (obj.year === String(currentYear) ? {
    ...obj,
    selected: true,
  } : obj));
}

const CalendarWrap = ({
  currentYear,
  data,
  changeYear,
}: CalendarType) => (
  <div>
    <ChooseYear
      changeYear={changeYear}
      years={getYears(currentYear)}
    />
    <Calendar
      startingDay="monday"
      dateFormat="ddd"
      hourFormat="HH"
    >
      <Wrap>
        {getAllMonthsOfGivenYear(currentYear || 2019).map((month) => (
          <Monthly data={data} key={month.toTimeString()} month={month} />
        ))}
      </Wrap>
    </Calendar>
  </div>
);


export default CalendarWrap;
