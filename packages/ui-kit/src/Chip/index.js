// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Chips.module.scss';

type Props = {
  id: string,
  title: string,
  onDelete: (string) => void,
  className?: string,
  style?: {
    [string]: number | string
  }
}

const Chip = (props: Props): Node => {
  const {
    title,
    id,
    onDelete,
    className,
    style,
    ...restProps
  } = props;
  return (
    <span style={style} className={classNames(styles.chip, className)} {...restProps}>
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
  style: {},
};

export default Chip;
