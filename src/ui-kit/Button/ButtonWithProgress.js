/* eslint-disable import/no-cycle */
// @flow
import React, { type Node } from 'react';
import noop from 'lodash.noop';
import Spinner from './Spinner';
import Button, { DEFAULT, type ButtonProps } from './Button';
import styles from './Button.module.scss';

type Props = ButtonProps & {
  loading?: boolean,
};

const ButtonWithProgress = (props: Props): Node => {
  const {
    onClick,
    use = DEFAULT,
    children,
    disabled,
    loading = false,
    ...restProps
  } = props;
  return (
    <Button
      {...restProps}
      onClick={onClick}
      use={use}
      disabled={disabled}
      className={loading ? styles.disableHover : ''}
    >
      <Spinner data-type="spinner" use={use} className={loading ? styles.contentVisible : styles.contentHidden} />
      <span
        className={loading ? styles.contentHidden : styles.contentVisible}
        data-type="content"
      >
        {children}
      </span>
    </Button>
  );
};

ButtonWithProgress.defaultProps = {
  onClick: noop,
  use: DEFAULT,
  disabled: false,
  loading: false,
};

export default ButtonWithProgress;
