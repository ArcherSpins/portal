// @flow
import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { format as formatDate } from 'date-fns';
import classNames from 'classnames';
// $FlowFixMe
import 'react-day-picker/lib/style.css';

import { Input } from 'ui-kit';
import styles from './Datepicker.module.scss';
import overlayStyles from './Overlay.module.scss';

const DEFAULT_FORMAT = 'DD.MM.YYYY';

type Props = {
  onDayChange: Date => void,
  format?: string,
  placeholder?: string,
  value?: Date,
  className?: string,
  label?: string,
  style?: {
    [string]: mixed
  }
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

const DateInput = (props: any) => {
  const { onFocus, onBlur } = props;
  return (
    <div
      className={styles.input}
    >
      <Input {...props} />
      <button type="button" onClick={onFocus} onBlur={onBlur} className={styles.icon__wrap}>
        <i className="icon-calendar" />
      </button>
    </div>
  );
};

const getDate = (date: Date, format: string) => formatDate(date, format);

const Datepicker = ({
  onDayChange,
  format = DEFAULT_FORMAT,
  placeholder = DEFAULT_FORMAT,
  value,
  className,
  style,
  label,
  ...props
}: Props) => {
  const inputRef = React.createRef();
  return (
    <div style={style} className={classNames(styles.datepicker, className)}>
      <span className={styles.label}>{label}</span>
      <DayPickerInput
        dayPickerProps={{
          ...props,
          classNames: overlayStyles,
          weekdaysShort,
          navbarElement: Navbar,
          onBlur: (e: SyntheticMouseEvent<HTMLElement>) => {
            // hack for hiding day picker
            // see: https://github.com/gpbl/react-day-picker/issues/926

            if (inputRef && inputRef.current) {
              if (!e.relatedTarget) {
                inputRef.current.hideAfterDayClick();
              }
            }
          },
        }}
        ref={inputRef}
        inputProps={{ ref: null }}
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
};

Datepicker.defaultProps = {
  format: DEFAULT_FORMAT,
  placeholder: DEFAULT_FORMAT,
  value: '',
  label: '',
  className: '',
  style: {},
};

export default Datepicker;
