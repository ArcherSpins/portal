/* eslint-disable react/no-unused-state */
// @flow

import React, { type Node } from 'react';
import { Loading } from '../../components/Loading/Loading';
import { Container } from './styled';

type LoadingProps = {
  children: Node,
  style: {
    [string]: mixed
  },
}

export default ({ children, style }: LoadingProps) => (
  <Container style={style}>
    <Loading />
    {children}
  </Container>
);
