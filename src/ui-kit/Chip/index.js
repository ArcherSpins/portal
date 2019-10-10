// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import classes from './Chips.module.scss';

type Props = {
  id: string,
  title: string,
  onDelete: (string) => void,
  className?: string,
  styles?: {
    [string]: number | string
  }
}

const Chip = (restProps: Props): Node => {
  const {
    title,
    id,
    onDelete,
    className,
    styles,
  } = restProps;
  return (
    <span style={styles} className={classNames(classes.chip, className)} {...restProps}>
      {title}
      <button
        type="button"
        onClick={() => onDelete(id)}
        className={classes['close-button']}
      >
        <i className="icon-cancel" />
      </button>
    </span>
  );
};

Chip.defaultProps = {
  className: '',
  styles: {},
};

export default Chip;
