// @flow
import React, { type Node } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import type { ButtonSize } from '../Button';
import buttonStyles from '../Button/Button.module.scss';
import styles from './LinkButton.module.scss';


type Props = {
  children: Node,
  to: string,
  className?: string,
  size?: ButtonSize
}

const Link = ({
  children, to, size, className, ...restProps
}: Props) => (
  <RouterLink
    {...restProps}
    to={to}
    className={classNames(
      styles.a,
      buttonStyles[size],
      className,
    )}
  >
    {children}
  </RouterLink>
);

Link.defaultProps = {
  className: '',
  size: 'md',
};

export default Link;
