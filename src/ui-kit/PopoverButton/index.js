/* eslint-disable react/button-has-type */
// @flow
import React from 'react';
import classNames from 'classnames';
import noop from 'lodash.noop';
import styles from './PopoverButton.module.scss';
import { ButtonWithProgress } from '../Button';

type Props = {
    type?: string,
    className?: string,
    loading?: boolean,
    disabled?: boolean,
    onClick?: (SyntheticMouseEvent<HTMLButtonElement>) => void,
    popover: string,
    style?: {
      [string]: mixed
    }
}


const PopoverButton = ({
  type,
  className,
  loading,
  disabled,
  onClick,
  popover,
  style,
}: Props) => (
  <ButtonWithProgress
    style={style}
    onClick={onClick}
    className={classNames(styles.button, className)}
    type={type}
    loading={loading}
    disabled={disabled}
  >
    {!loading && !disabled && (<div className={styles.popover}>{popover}</div>)}
    <span>+</span>
  </ButtonWithProgress>
);

PopoverButton.defaultProps = {
  type: '',
  className: '',
  loading: false,
  disabled: false,
  onClick: noop,
  style: {},
};

export default PopoverButton;
