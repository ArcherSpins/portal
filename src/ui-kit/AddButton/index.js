/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
// @flow
import React from 'react';
import classNames from 'classnames';
import noop from 'lodash.noop';
import styles from './AddButton.module.scss';
import Spinner from '../Spinner';

type Props = {
    type?: string,
    className?: string,
    loading?: boolean,
    disabled?: boolean,
    onClick?: (SyntheticMouseEvent<HTMLButtonElement>) => void,
    popover: string,
    style?: {
      [string]: number | string
    }
}


const AddButton = ({
  type, className, loading, disabled, onClick, popover, style,
}: Props) => (
  <button
    style={style}
    type={type}
    className={classNames(styles.button, className)}
    disabled={disabled}
  >
    {!loading && !disabled && (<div className={styles.popover}>{popover}</div>)}
    {loading ? <Spinner data-type="spinner" /> : <span>+</span>}
  </button>
);

AddButton.defaultProps = {
  type: '',
  className: '',
  loading: false,
  disabled: false,
  onClick: noop,
  style: {},
};

export default AddButton;
