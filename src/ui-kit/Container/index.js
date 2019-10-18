// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Container.module.scss';

type Props = {
  children: Node,
  className?: string,
  style?: {
    [string]: mixed
  }
}

const Container = ({ children, className, style }: Props) => (
  <div style={style} className={classNames(styles.container, className)}>
    {children}
  </div>
);

Container.defaultProps = {
  className: '',
  style: {},
};

export default Container;
