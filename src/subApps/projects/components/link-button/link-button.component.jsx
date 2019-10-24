// @flow
import React, { type Node } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'ui-kit';
import './link-button.styles.scss';

type Props = {
  to: string,
  children: Node
};

const LinkButton = ({ to, children, ...rest }: Props) => (
  <Button className="link-button" {...rest}>
    <Link to={to}>{children}</Link>
  </Button>
);

export default LinkButton;
