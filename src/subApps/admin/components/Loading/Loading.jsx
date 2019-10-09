// @flow
import React from 'react';
import Loader from 'react-loading';

type Props = {
  color?: string,
  type?: string,
};

export const Loading = ({ color, type }: Props) => (
  <Loader color={color} type={type} />
);

Loading.defaultProps = {
  color: '#333',
  type: 'cubes',
};

export default Loading;
