// @flow
import React from 'react';
import classNames from 'classnames';
import styles from './Spinner.module.scss';

type Props = {
  className?: string,
  use?: 'dark' | 'light' | ''
}

const Spinner = ({ className = '', use, ...restProps }: Props) => (
  <div
    {...restProps}
    type="spinner"
    className={
      classNames(styles.spinner, styles[use], className)
    }
  />
);

Spinner.defaultProps = {
  className: '',
  use: '',
};

export default Spinner;
