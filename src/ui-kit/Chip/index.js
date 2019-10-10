// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Chips.module.scss';

type Props = {
  id: string,
  title: string,
  onDelete: (string) => void,
  className?: string,
}

const Chip = (restProps: Props): Node => {
  const {
    title,
    id,
    onDelete,
    className,
  } = restProps;
  return (
    <span className={classNames(styles.chip, className)} {...restProps}>
      {title}
      <button
        type="button"
        onClick={() => onDelete(id)}
        className={styles['close-button']}
      >
        <i className="icon-cancel" />
      </button>
    </span>
  );
};

Chip.defaultProps = {
  className: '',
};

export default Chip;
