/* eslint-disable react/no-array-index-key */
// @flow
import React from 'react';
// $FlowFixMe
import { format, startOfMonth } from 'date-fns';
import {
  MonthlyCalendar,
  WeeklyCalendar,
} from 'okami';
import {
  DayLabel,
  Div,
  CalendarWrap,
  MonthLabel,
  DaysLabels,
} from './styled';
import Daily from './Daily';

type Props = {
  className?: string,
  style?: {
    [string]: mixed
  },
  month?: Date,
  data: {
    [string]: string
  }
};

// $FlowFixMe
const Monthly = React.memo(({
  className, style, month = startOfMonth(new Date()), data, ...props
}: Props) => (
  <MonthlyCalendar start={month} {...props}>
    {({ calendar }) => (
      <CalendarWrap {...{ className, style }}>
        <Div
          style={{
            justifyContent: 'flex-start',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <MonthLabel>{format(month, 'MMMM')}</MonthLabel>
          <DaysLabels
            renderChild={(innerProps) => <DayLabel {...innerProps} />}
          />
          <Div style={{ display: 'flex', flexDirection: 'column' }}>
            {calendar.map((startWeek) => (
              <WeeklyCalendar key={startWeek} start={startWeek}>
                {({ calendar: weekly }) => (
                  <Div style={{ display: 'flex' }}>
                    {weekly.map((day, indx) => (
                      <Daily
                        data={data}
                        day={day}
                        key={indx}
                        month={month}
                      />
                    ))}
                  </Div>
                )}
              </WeeklyCalendar>
            ))}
          </Div>
        </Div>
      </CalendarWrap>
    )}
  </MonthlyCalendar>
));

// $FlowFixMe
Monthly.defaultProps = {
  className: '',
  style: {},
  month: startOfMonth(new Date()),
};

export default Monthly;
