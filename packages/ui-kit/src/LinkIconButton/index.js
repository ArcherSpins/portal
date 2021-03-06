// @flow
import React, { type Node } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import noop from 'lodash.noop';
import styles from './LinkIconButton.module.scss';

type Props = {
  to: string,
  type?: string,
  onClick?: (SyntheticMouseEvent<HTMLButtonElement>) => void,
  className?: string,
  children: Node,
  disabled?: boolean
}


const LinkIconButton = ({
  to,
  type,
  onClick,
  className,
  children,
  disabled,
}: Props) => (
  <Link
    to={to}
    className={classNames(styles.linkButton, className, { [styles.disabledLinkButton]: disabled })}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </Link>
);

LinkIconButton.defaultProps = {
  onClick: noop,
  type: '',
  disabled: false,
  className: '',
};

export default LinkIconButton;
