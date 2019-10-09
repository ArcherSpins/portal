/* eslint-disable */
// @flow
import React, { Component, type Node } from 'react';
import type { Chip as ChipType } from './types';
import styles from './Chips.module.scss';
import icon from './closeIcon.svg';

type ChipComponentType = {
  ...ChipType,
  onDeletedChips: (string) => void
}

const Chip = ({
  title,
  id,
  onDeletedChips
}: ChipComponentType): Node => (
  <span className={styles.chip}>
    { title }
    <button
      type="button"
      onClick={() => onDeletedChips(id)}
      className={styles['close-button']}
    >
      <img src={icon} />
    </button>
  </span>
);

export default Chip;
