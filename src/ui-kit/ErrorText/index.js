// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './ErrorText.module.scss';

type Props = {
  className?: string,
  children: Node,
  style?: {
    [string]: mixed
  }
}

const ErrorText = ({ className, children, ...rest }: Props) => (
  <p {...rest} className={classNames(styles.error, className)}>
    {children}
  </p>
);

ErrorText.defaultProps = {
  className: '',
  style: {},
};

export default ErrorText;
