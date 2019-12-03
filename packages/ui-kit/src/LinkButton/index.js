// @flow
import React, { type Node } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { type ButtonSize } from '../Button';
import styles from './LinkButton.module.scss';
import buttonStyles from '../Button/Button.module.scss';


type Props = {
  children: Node,
  size?: ButtonSize,
  to: string,
  className?: string
}

const LinkButton = ({
  children, size, to, className, ...restProps
}: Props) => (
  <Link
    {...restProps}
    to={to}
    className={classNames(
      styles.link,
      buttonStyles[size],
      className,
    )}
  >
    {children}
  </Link>
);

LinkButton.defaultProps = {
  size: 'md',
  className: '',
};

export default LinkButton;
