// @flow
import React from 'react';
import { Title, Container } from './styled';

type Props = {
  title: string,
  children?: React.Node,
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
