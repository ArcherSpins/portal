/* eslint-disable react/no-unused-state */
// @flow

import React, { type Node } from 'react';
import { Loading } from '../../components/Loading/Loading';
import { Container } from './styled';

type LoadingProps = {
  children: Node,
  styles: {
    [string]: mixed
  },
}

export default ({ children, styles }: LoadingProps) => (
  <Container style={styles}>
    <Loading />
    {children}
  </Container>
);
