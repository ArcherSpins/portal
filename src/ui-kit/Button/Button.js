/* eslint-disable import/no-cycle */
// @flow
import React, { type Node } from 'react';
import noop from 'lodash.noop';
import styles from './Button.module.scss';
import { type ButtonUse } from './types';

export const DEFAULT = 'default';

export type ButtonProps = {
  /** Функция-обработчик события клика */
  onClick?: (SyntheticMouseEvent<HTMLButtonElement>) => void,
  /** Тип */
  use?: ButtonUse,
  children: Node,
  disabled?: boolean,
};

const Button = (props: ButtonProps) => {
  const {
    onClick,
    use = DEFAULT,
    children,
    disabled,
    ...restProps
  } = props;
  return (
    <button
      {...restProps}
      type="button"
      disabled={disabled}
      className={`
        ${styles[use]}
      `}
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
};

export default Button;
