// @flow
import React from 'react';
import DayPickerInput from 'react-day-picker/lib/src/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import { format as dateFnsFormat, parse as dateFnsParse } from 'date-fns';
import classNames from 'classnames';
import Input from '../Input/index';
import styles from './Datepicker.module.scss';
import overlayStyles from './Overlay.module.scss';
// $FlowFixMe
import 'react-day-picker/lib/style.css';


const DEFAULT_FORMAT = 'd.L.y';

type OverlayAlign = 'left' | 'right';

type Props = {
  onDayChange: Date => void,
  format?: string,
  placeholder?: string,
  overlayAlign?: OverlayAlign,
  value?: Date,
  label?: string,
  className?: string,
  name: string,
  label?: string,
  style?: {
    [string]: mixed
  },
  containerProps?: {
    [string]: any
  },
  error?: boolean
};

type NavbarElementProps = {
  onNextClick: () => void,
  onPreviousClick: () => void,
}

const weekdaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Navbar = ({ onNextClick, onPreviousClick }: NavbarElementProps) => (
  <div className={classNames(overlayStyles.nav)}>
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
  console.log(props);
  return (
    <div
      className={styles.input}
    >
      <Input
        mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
        {...props}
      />
      <button type="button" onClick={onFocus} onBlur={onBlur} className={styles.icon__wrap}>
        <i className="icon-calendar" />
      </button>
    </div>
  );
};

const getDate = (date: Date, format: string) => dateFnsFormat(date, format);

const parseDate = (str, format) => {
  const parsed = dateFnsParse(str, format, new Date());
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
};

const Datepicker = ({
  onDayChange,
  format = DEFAULT_FORMAT,
  placeholder = DEFAULT_FORMAT,
  value,
  className,
  name,
  label,
  style,
  error,
  containerProps,
  overlayAlign,
  ...props
}: Props) => {
  const inputRef = React.createRef();
  return (
    <div
      {...containerProps}
      style={style}
      className={classNames(styles.datepicker, { [styles.error_picker]: error }, className)}
    >
      <label htmlFor={name}>{label}</label>
      {/* <span className={styles.label}>{label}</span> */}
      <DayPickerInput
        name={name}
        dayPickerProps={{
          ...props,
          classNames: {
            ...overlayStyles,
            container: overlayAlign === 'left'
              ? overlayStyles['container_align-left'] : overlayStyles.container,
          },
          weekdaysShort,
          navbarElement: Navbar,
          selectedDays: value,
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
        parseDate={parseDate}
        onDayChange={onDayChange}
        value={value}
      />
    </div>
  );
};

Datepicker.defaultProps = {
  format: DEFAULT_FORMAT,
  placeholder: 'DD.MM.YYYY',
  value: '',
  label: '',
  className: '',
  style: {},
  error: false,
  containerProps: {},
  overlayAlign: 'right',
};

export default Datepicker;
