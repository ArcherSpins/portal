// @flow
import React, { type Node } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { type ButtonSize } from '../Button';
import { type ButtonUse } from '../Button/types';
import styles from './LinkButton.module.scss';
import buttonStyles from '../Button/Button.module.scss';


type Props = {
  children: Node,
  size?: ButtonSize,
  to: string,
  use?: ButtonUse,
  className?: string
}

const LinkButton = ({
  children, size, use, to, className, ...restProps
}: Props) => (
  <Link
    {...restProps}
    to={to}
    className={classNames(
      styles.link,
      buttonStyles[size],
      buttonStyles[use],
      className,
    )}
  >
    {children}
  </Link>
);

LinkButton.defaultProps = {
  size: 'md',
  use: 'default',
  className: '',
};

export default LinkButton;
