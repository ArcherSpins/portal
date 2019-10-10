// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Chips.module.scss';

type Props = {
  id: string,
  title: string,
  onDelete: (string) => void,
  className?: string
}

const Chip = (props: Props): Node => {
  const {
    title,
    id,
    onDelete,
    className,
  } = props;
  return (
    <span {...props} className={classNames(styles.chip, className)}>
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
