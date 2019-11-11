/* eslint-disable react/prefer-stateless-function */
// @flow
import React, { PureComponent } from 'react';
// $FlowFixMe
import { getMonth, isToday, isWeekend } from 'date-fns';
import { DailyCalendar } from 'okami';
import {
  DayCell,
  DayLabel,
  DayText,
} from './styled';

type Props = {
  day: Date,
  month: Date,
  data: {
    [string]: string
  }
}

const MONTH_ARRAY = [
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

class Daily extends PureComponent<Props> {
  getHappyDay = (day: any, num: string) => {
    const { month, data } = this.props;
    const findDays = data[MONTH_ARRAY[month.getMonth()]];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    if (findDays && day.getMonth() === month.getMonth()
      && days[day.getDay()] !== 'Sunday' && days[day.getDay()] !== 'Saturday') {
      return findDays
        .split(',').find((item) => String(item).padStart(2, '0') === String(num).padStart(2, '0')) ? '#DF160A' : null;
    }
    return null;
  }

  render() {
    const { month, day } = this.props;

    return (
      <DailyCalendar start={day} dateFormat="DD">
        {({ start: currentDay, dateLabel }) => (
          <DayCell>
            <DayLabel
              isCurrentMonth={getMonth(month) === getMonth(currentDay)}
              isToday={isToday(currentDay) && day.getMonth() === month.getMonth()}
              isWeekend={isWeekend(currentDay)}
            >
              <DayText
                style={{
                  color: this.getHappyDay(day, dateLabel()),
                }}
              >
                {dateLabel()}
              </DayText>
            </DayLabel>
          </DayCell>
        )}
      </DailyCalendar>
    );
  }
}

export default Daily;
