/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-unused-state */
// TODO: сделать экспорт по умолчанию
// @flow
import React from 'react';
import DatePicker from 'react-datepicker';
// $FlowFixMe
import 'react-datepicker/dist/react-datepicker.css';

type PickerProps = {
  date: string | any,
  handleChange: (any) => void,
  style?: {
    [string]: mixed
  },
  dateFormat?: string | any
}

const Picker = ({
  date, handleChange, style, dateFormat,
}: PickerProps) => (
  <div className="data-picker-block">
    <DatePicker
      style={style}
      selected={date}
      onChange={handleChange}
      dateFormat={dateFormat || 'dd MMMM yyyy'}
    />
  </div>
);

Picker.defaultProps = {
  style: {},
  dateFormat: 'dd MMMM yyyy',
};

export { Picker };
