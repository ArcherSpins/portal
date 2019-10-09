// @flow
import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';

const Text = styled.p`
  font-size: 18px;
  color: gray;
  padding: 10px;
`;

export default ({ message }: { message: string }): Node => (
  <Text>
    { message || 'Not found' }
  </Text>
);
