// @flow
import React, { type Node } from 'react';
import noop from 'lodash.noop';
import classNames from 'classnames';
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
  /** onChange */
  onChange?: (e: SyntheticEvent<HTMLInputElement>) => void,
}

const Input = ({
  type,
  placeholder,
  onChange,
  error,
  disabled,
  value,
  className = '',
  use = 'default',
  ...restProps
}: Props): Node => (
  <div
    {...restProps}
    className={classNames(styles[use], { [styles[error]]: error }, className)}
  >
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      value={value}
    />
  </div>
);

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  onChange: noop,
  error: false,
  disabled: false,
  use: 'default',
  value: '',
  className: '',
};

export default Input;
