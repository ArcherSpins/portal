// @flow

import React, { type Node } from 'react';
import { Transparent } from './styled';

type TransparentProps = {
  text: string,
  onClick: () => void,
  children: Node,
}

export default ({
  text,
  onClick,
  children,
}: TransparentProps) => (
  <Transparent onClick={onClick}>
    {children || text}
  </Transparent>
);
