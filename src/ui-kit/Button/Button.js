/* eslint-disable import/no-cycle */
// @flow
import React, { type Node } from 'react';
import noop from 'lodash.noop';
import classNames from 'classnames';
import styles from './Button.module.scss';
import { type ButtonUse } from './types';

export const DEFAULT = 'default';

type Size = 'md' | 'sm';
type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonProps = {
  /** Функция-обработчик события клика */
  onClick?: (SyntheticMouseEvent<HTMLButtonElement>) => void,
  /** Тип */
  use?: ButtonUse,
  children: Node,
  disabled?: boolean,
  className?: string,
  size?: Size,
  type?: ButtonType
};

const Button = (props: ButtonProps) => {
  const {
    onClick,
    use = DEFAULT,
    children,
    disabled,
    className = [],
    size,
    type = 'button',
    ...restProps
  } = props;
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      {...restProps}
      disabled={disabled}
      type={type}
      className={classNames(styles[use], styles[size], className)}
      onClick={onClick}
    >
      <span>
        {children}
      </span>
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
};

export default Button;
