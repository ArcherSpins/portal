// @flow
import React, { type Node } from 'react';
import noop from 'lodash.noop';
import classNames from 'classnames';
import xmark from './xmark.svg';
import styles from './Input.module.scss';

type ValueType = 'password' | 'text';

type InputType = 'default' | 'borderless';

type Props = {
  /** Тип текстового значения инпута. @example: input[type="text"] */
  type?: ValueType,
  placeholder?: string,
  error?: boolean,
  /** Тип инпута */
  use?: InputType,
  disabled?: boolean,
  className?: string,
  value?: string,
  label?: string,
  name: string,
  icon?: Node,
  clearable?: boolean,
  onClearClick?: () => void,
  /** onChange */
  onChange?: (e: SyntheticEvent<HTMLInputElement>) => void,
  /** Срабатывает при потере фокуса */
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void
}

const Input = ({
  type,
  placeholder,
  onChange,
  error,
  disabled,
  value,
  className = '',
  name,
  use = 'default',
  label,
  onBlur,
  clearable,
  onClearClick,
  icon,
  ...restProps
}: Props): Node => (
  <div
    {...restProps}
    className={
      classNames(
        styles[use],
        { [styles.error]: error, [styles.paddingLeft]: icon },
        className,
      )
    }
  >
    <label htmlFor={name}>
      {label}
      <div className={styles.wrap}>
        <span className={styles.icon}>{icon && icon}</span>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          value={value}
        />
        {clearable && <button onClick={onClearClick} className={styles.clear} type="button"><img src={xmark} alt="clear" /></button>}
      </div>
    </label>

  </div>
);

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  onChange: noop,
  onBlur: noop,
  error: false,
  disabled: false,
  use: 'default',
  value: '',
  className: '',
  label: '',
  clearable: false,
  onClearClick: noop,
  icon: null,
};

export default Input;
