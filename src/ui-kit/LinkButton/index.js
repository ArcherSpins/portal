// @flow
import React, { type Node } from 'react';
import { Button } from 'ui-kit';
import styles from './LinkButton.module.scss';

type Props = {
  children: Node
}

const LinkButton = ({ children, ...rest }: Props) => (
  <Button {...rest} className={styles.link}>
    {children}
  </Button>
);

export default LinkButton;
