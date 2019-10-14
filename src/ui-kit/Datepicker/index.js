// @flow
import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { format as formatDate } from 'date-fns';
// $FlowFixMe
import 'react-day-picker/lib/style.css';

import styles from './Datepicker.module.scss';
import overlayStyles from './Overlay.module.scss';

const DEFAULT_FORMAT = 'DD.MM.YYYY';

type Props = {
  onDayChange: Date => void,
  format?: string,
  placeholder?: string,
  value?: Date
};

type NavbarElementProps = {
  onNextClick: () => void,
  onPreviousClick: () => void
}

const weekdaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];


const Navbar = ({ onNextClick, onPreviousClick }: NavbarElementProps) => (
  <div className={overlayStyles.nav}>
    <button
      type="button"
      onClick={() => onPreviousClick()}
    >
      <i className="icon-left-open" />
    </button>
    <button
      type="button"
      onClick={() => onNextClick()}
    >
      <i className="icon-right-open" />
    </button>
  </div>
);

const DateInput = (props) => (
  <div
    className={styles.input}
  >
    <input {...props} />
    <span className={styles.icon__wrap}>
      <i className="icon-calendar" />
    </span>
  </div>
);

const getDate = (date: Date, format: string) => formatDate(date, format);

const Datepicker = ({
  onDayChange,
  format = DEFAULT_FORMAT,
  placeholder = DEFAULT_FORMAT,
  value,
}: Props) => (
  <div className={styles.datepicker}>
    <DayPickerInput
      dayPickerProps={{
        classNames: overlayStyles,
        weekdaysShort,
        navbarElement: Navbar,
      }}
      component={DateInput}
      classNames={styles}
      format={format}
      placeholder={placeholder}
      formatDate={getDate}
      onDayChange={onDayChange}
      value={value}
    />
  </div>
);

Datepicker.defaultProps = {
  format: DEFAULT_FORMAT,
  placeholder: DEFAULT_FORMAT,
  value: '',
};

export default Datepicker;
