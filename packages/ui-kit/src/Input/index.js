// @flow
import React, { type Node, useState } from 'react';
import MaskedInput from 'react-text-mask';
import noop from 'lodash.noop';
import classNames from 'classnames';
import xmark from './xmark.svg';
import styles from './Input.module.scss';

type ValueType = 'password' | 'text';

type InputType = 'default' | 'borderless';

type InputSize = 'sm' | 'md';

export type InputProps = {
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
  prefix?: string,
  onClearClick?: () => void,
  /** onChange */
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Срабатывает при потере фокуса */
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  mask?: Array<mixed>,
  size?: InputSize
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
  prefix,
  onClearClick,
  icon,
  mask,
  size,
  onFocus,
  ...restProps
}: InputProps) => {
  const [focused, toggleFocused] = useState(false);

  const handleBlur = (event: SyntheticInputEvent<HTMLInputElement>) => {
    toggleFocused(false);

    if (onBlur) {
      onBlur(event);
    }
  };

  const handleFocus = (event: SyntheticInputEvent<HTMLInputElement>) => {
    toggleFocused(true);

    if (onFocus) {
      onFocus(event);
    }
  };

  if (icon && prefix) throw new Error('icon and prefix props cannot be used at the same time');

  return (
    <div
      className={
        classNames(
          styles[use],
          styles[size],
          {
            [styles.error]: error,
            [styles.paddingLeft]: icon,
            [styles.focus]: focused,
            [styles.disabled]: disabled,
          },
          className,
        )
      }
    >
      <label htmlFor={name}>
        {label}
      </label>
      <div className={classNames(styles.wrap)}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        {
          mask ? (
            <MaskedInput
              mask={mask}
              placeholder={placeholder}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              id={name}
              {...restProps}
              render={(ref, props) => (
                <input
                  ref={ref}
                  {...restProps}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  disabled={disabled}
                  value={value}
                  {...props}
                />
              )}
            />
          ) : (
            <input
              {...restProps}
              name={name}
              type={type}
              placeholder={placeholder}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              value={value}
            />
          )
        }
        {/* TODO: REPLACE SVG TO <i /> */}
        {clearable && (value && value.length) && <button onClick={onClearClick} className={styles.clear} type="button"><img src={xmark} alt="clear" /></button>}
      </div>
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  onChange: noop,
  onBlur: noop,
  onFocus: noop,
  error: false,
  disabled: false,
  use: 'default',
  value: '',
  className: '',
  label: '',
  clearable: false,
  onClearClick: noop,
  icon: null,
  prefix: '',
  mask: null,
  size: 'md',
};

export default Input;
