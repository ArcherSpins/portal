// @flow

import React from 'react';
import styles from './Checkbox.module.scss';

type CheckboxProps = {
  id: string,
  checked: boolean,
  label?: string,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void,
};

const Checkbox = ({
  label,
  id,
  checked,
  onChange,
}: CheckboxProps) => (
  <div className={styles.checkbox}>
    <label htmlFor={id}>
      <input
        id={id}
        onChange={onChange}
        type="checkbox"
        checked={checked}
      />
      <span className={styles.checkbox__icon}>
        {checked && <i className="icon-check" />}
      </span>
      {label && label.length > 0 && (<b>{label}</b>)}
    </label>
  </div>
);

Checkbox.defaultProps = {
  label: '',
};

export default Checkbox;
