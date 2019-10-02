// @flow
import React from 'react';
import styles from './Spinner.module.scss';
// import type { ButtonUse } from '../types';

type Props = {
  // use: ButtonUse,
  className?: string
}

const Spinner = ({ className = '', ...restProps }: Props) => (
  <div
    {...restProps}
    type="spinner"
    className={`
      ${styles.spinner}
      ${className}
    `}
  />
);

Spinner.defaultProps = {
  className: '',
};

export default Spinner;
