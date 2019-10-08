/* eslint-disable react/no-unused-state */
// @flow
import React from 'react';
import DatePicker from 'react-datepicker';
// $FlowFixMe
import 'react-datepicker/dist/react-datepicker.css';

export type PickerProps = {
  startDate: string | any,
  handleChange: (any) => void,
  style: string | mixed,
  dateFormat: string | any
}

// eslint-disable-next-line import/prefer-default-export
export const Picker = ({
  startDate, handleChange, style, dateFormat,
}: PickerProps) => (
  <div>
    <DatePicker
      style={style}
      selected={startDate}
      onChange={handleChange}
      dateFormat={dateFormat || 'dd MMMM yyyy'}
    />
  </div>
);
