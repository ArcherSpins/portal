// @flow
import React from 'react';
import icon from '../../assets/icons/arrow-left.png';
import { Button, Img } from './styled';

type ButtonProps = {
  onClick: () => void,
  style: {
    [string]: number | string | null
  },
  className: string,
}

export default ({
  onClick,
  style,
  className,
}: ButtonProps) => (
  <Button className={className} onClick={onClick} style={style}>
    <Img src={icon} />
  </Button>
);
