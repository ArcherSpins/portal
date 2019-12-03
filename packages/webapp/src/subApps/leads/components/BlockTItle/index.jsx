// @flow
import React, { type Node } from 'react';
import { Title, Container } from './styled';

type Props = {
  title: string,
  children?: Node,
}

const BlockTitle = ({
  title,
  children,
}: Props) => (
  <Container>
    <Title>{title}</Title>
    {children}
  </Container>
);

BlockTitle.defaultProps = {
  children: null,
};

export default BlockTitle;
