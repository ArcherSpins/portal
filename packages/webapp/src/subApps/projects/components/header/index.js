// @flow

import React, { type Node } from 'react';
import styles from './Header.module.scss';

type Props = {
  children: Node,
};

const Header = ({ children, ...restProps }: Props) => (
  <header {...restProps} className={styles.header}>
    {children}
  </header>
);

export default Header;
