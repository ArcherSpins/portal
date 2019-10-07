// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Container.module.scss';

type Props = {
  children: Node,
  className?: string
}

const Container = ({ children, className }: Props) => (
  <div className={classNames(styles.container, className)}>
    {children}
  </div>
);

Container.defaultProps = {
  className: '',
};

export default Container;
