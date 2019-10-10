// @flow
import React, { type Node } from 'react';
import { Button } from './styled';

type ButtonProps = {
  children?: Node,
  onClick: () => void,
  text?: string,
  style?: {
    [string]: mixed
  },
  type?: string
}

const ButtonComponent = ({
  children,
  onClick,
  text,
  style,
  type,
}: ButtonProps) => (
  <Button type={type || 'button'} style={style} onClick={onClick}>
    { children || text }
  </Button>
);

ButtonComponent.defaultProps = {
  children: null,
  text: '',
  style: {},
  type: 'button',
};

export default ButtonComponent;
