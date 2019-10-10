// @flow
import React from 'react';
import noop from 'lodash.noop';

import './custom-button.styles.scss';

type Props = {
  onClick?: (e: SyntheticMouseEvent<*>) => void,
  color?: string,
  children: string
};

const CustomButtom = ({ color, children, ...rest }: Props) => (
  <button
    type="button"
    className={`${color || ''} custom-button`}
    {...rest}
  >
    {children}
  </button>
);

CustomButtom.defaultProps = {
  onClick: noop,
  color: '',
};
export default CustomButtom;
