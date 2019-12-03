// @flow
import React, { type Node } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import type { ButtonUse, ButtonSize, ButtonColor } from '../Button';
import styles from './LinkButton.module.scss';
import buttonStyles from '../Button/Button.module.scss';


type Props = {
  children: Node,
  size?: ButtonSize,
  use?: ButtonUse,
  color?: ButtonColor,
  to: string,
  className?: string
}

const LinkButton = ({
  children, size, use, color, to, className, ...restProps
}: Props) => (
  <Link
    {...restProps}
    to={to}
    className={classNames(
      styles.link,
      buttonStyles[size],
      buttonStyles[use],
      buttonStyles[color],
      className,
    )}
  >
    {children}
  </Link>
);

LinkButton.defaultProps = {
  size: 'md',
  className: '',
  use: 'default',
  color: 'success',
};

export default LinkButton;
