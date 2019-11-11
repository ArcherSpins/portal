// @flow
import React from 'react';

import styles from './Radio.module.scss';

type Props = {
    type: string,
    id?: string,
    name?: string,
    onChange: (e: SyntheticEvent<HTMLInputElement>) => void,
    value: string,
    htmlFor?: string,
    spanText?: string,
    checked?: boolean
}

const RadioButton = ({
  type,
  id,
  name,
  onChange,
  value,
  htmlFor,
  spanText,
  checked,
  ...restProps
}: Props) => (
  <div {...restProps} className="radio-group">
    <input
      defaultChecked={checked}
      type={type}
      id={id}
      name={name}
      onChange={onChange}
      className={styles['radio-input']}
      value={value}
    />
    <label htmlFor={htmlFor} className={styles['form-label']}>
      <span className={styles['radio-button']} />
      <span className={styles.label}>{spanText}</span>
    </label>
  </div>
);


RadioButton.defaultProps = {
  id: '',
  name: '',
  htmlFor: '',
  spanText: '',
  checked: false,
};

export default RadioButton;
