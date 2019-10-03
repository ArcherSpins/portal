// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Headings.module.scss';

type HeadingsType = 'h1' | 'h2' | 'h3' | 'h4';

type Props = {
  children: Node,
  // eslint-disable-next-line react/require-default-props
  className?: ''
}

const createHeading = (type: HeadingsType) => ({ children, className = '', ...rest }: Props) => {
  const hProps = { className: classNames(styles[type], className), children, ...rest };
  return React.createElement(type, hProps, children);
};

export const H1 = createHeading('h1');
export const H2 = createHeading('h2');
export const H3 = createHeading('h3');
export const H4 = createHeading('h4');
