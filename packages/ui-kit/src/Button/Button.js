/* eslint-disable import/no-cycle */
// @flow
import React, { type Node } from 'react';
import noop from 'lodash.noop';
import classNames from 'classnames';
import styles from './Button.module.scss';
import type { ButtonUse, ButtonColor } from './types';

export const DEFAULT = 'default';

export type ButtonSize = 'md' | 'sm';
export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonProps = {
  /** Функция-обработчик события клика */
  onClick?: (SyntheticMouseEvent<HTMLButtonElement>) => void,
  /** Тип */
  use?: ButtonUse,
  children: Node,
  disabled?: boolean,
  className?: string,
  size?: ButtonSize,
  type?: ButtonType,
  color?: ButtonColor
};

const Button = (props: ButtonProps) => {
  const {
    onClick,
    use = DEFAULT,
    children,
    disabled,
    className = [],
    size,
    color,
    type = 'button',
    ...restProps
  } = props;
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      {...restProps}
      disabled={disabled}
      type={type}
      className={classNames(styles[use], styles[size], styles[color], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  onClick: noop,
  use: DEFAULT,
  disabled: false,
  size: 'md',
  className: '',
  type: 'button',
  color: 'success',
};

export default Button;
