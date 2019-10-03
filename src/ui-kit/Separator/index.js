// @flow
import React from 'react';
import classNames from 'classnames';
import styles from './Separator.module.scss';

type Props = {
  className?: ''
}

const Separator = ({ className }: Props) => (
  <div className={classNames(styles.separator, className)} />
);

Separator.defaultProps = {
  className: '',
};

export default Separator;
