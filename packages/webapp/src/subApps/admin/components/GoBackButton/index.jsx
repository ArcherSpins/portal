// @flow
import React from 'react';
import { Button } from './styled';

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
  ...rest
}: ButtonProps) => (
  <Button {...rest} className={className} onClick={onClick} style={style}>
    <i className="icon-left-open" />
  </Button>
);
