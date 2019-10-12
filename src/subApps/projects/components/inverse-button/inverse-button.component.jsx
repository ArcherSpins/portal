// @flow
import React, { type Node } from 'react';
import noop from 'lodash.noop';

import './inverse-button.styles.scss';

type Props = {
  color?: string,
  onClick?: (e: SyntheticMouseEvent<*>) => void,
  type?: string,
  children?: Node
};

const InverseButton = ({ color, children, ...rest }: Props) => (
  <button
    type="button"
    className={`${color || ''} inverse-button`}
    {...rest}
  >
    {children}
  </button>
);

InverseButton.defaultProps = {
  color: '',
  onClick: noop,
  type: '',
  children: '',
};

export default InverseButton;
