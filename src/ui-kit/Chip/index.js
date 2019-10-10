// @flow
import React, { type Node } from 'react';
import styles from './Chips.module.scss';
import icon from './closeIcon.svg';

type ChipComponentType = {
  id: string,
  title: string,
  onClick: (string) => void
}

const Chip = ({
  title,
  id,
  onClick,
}: ChipComponentType): Node => (
  <span className={styles.chip}>
    {title}
    <button
      type="button"
      onClick={() => onClick(id)}
      className={styles['close-button']}
    >
      <img src={icon} alt="close-icon" />
    </button>
  </span>
);

export default Chip;
