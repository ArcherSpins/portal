// @flow

import React, { type Node } from 'react';
import classnames from 'classnames';
import styles from './Accent.module.scss';

type Color = "info" | "success" | "danger"

type Props = {
  color?: Color,
  className: string,
  children: Node
}

const Accent = ({
  color, className, children, ...rest
}: Props) => (
  <div
    {...rest}
    className={classnames(
      styles.wrapper,
      styles[color],
      className,
    )}
  >
    {children}
  </div>
);

Accent.defaultProps = {
  color: 'info',
};

export default Accent;
