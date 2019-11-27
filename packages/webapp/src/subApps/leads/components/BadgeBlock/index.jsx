// @flow
import React, { type Node } from 'react';
import './style.scss';

type Props = {
  title: string,
  children: Node
}

export default ({
  title,
  children,
}: Props) => (
  <div className="widget-block">
    <div className="badge-title">
      {`${title}: `}
    </div>
    <div className="cut-text">{children}</div>
  </div>
);
