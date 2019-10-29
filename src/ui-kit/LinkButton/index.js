// @flow
import React, { type Node } from 'react';
import { Link } from 'react-router-dom';
import { type ButtonSize } from 'ui-kit/Button/Button';
import classNames from 'classnames';
import { type ButtonUse } from '../Button/types';
import styles from './LinkButton.module.scss';
import buttonStyles from '../Button/Button.module.scss';


type Props = {
  children: Node,
  size?: ButtonSize,
  to: string,
  use?: ButtonUse
}

const LinkButton = ({
  children, size, use, to,
}: Props) => (
  <Link
    to={to}
    className={classNames(
      styles.link,
      buttonStyles[size],
      buttonStyles[use],
    )}
  >
    {children}
  </Link>
);

LinkButton.defaultProps = {
  size: 'md',
  use: 'default',
};

export default LinkButton;
