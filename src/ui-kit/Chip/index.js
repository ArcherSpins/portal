// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Chips.module.scss';
import icon from './closeIcon.svg';

type Props = {
  id: string,
  title: string,
  onDelete: (string) => void,
  className?: string
}

const Chip = ({
  title,
  id,
  onDelete,
  className,
}: Props): Node => (
  <span className={classNames(styles.chip, className)}>
    {title}
    <button
      type="button"
      onClick={() => onDelete(id)}
      className={styles['close-button']}
    >
      <img src={icon} alt="close-icon" />
    </button>
  </span>
);

Chip.defaultProps = {
  className: '',
};

export default Chip;
