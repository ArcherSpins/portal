// @flow
import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
// $FlowFixMe
import 'react-day-picker/lib/style.css';

import styles from './Datepicker.module.scss';
import overlayStyles from './Overlay.module.scss';

type Props = {
  onDayChange: Date => void,
};

const weekdaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];


const Datepicker = ({ onDayChange }: Props) => (
  <div className={styles.datepicker}>
    <DayPickerInput
      dayPickerProps={{
        classNames: overlayStyles,
        weekdaysShort,
      }}
      onDayChange={onDayChange}
      showOverlay
    />
  </div>
);

export default Datepicker;
