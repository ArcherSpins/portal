// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import noop from 'lodash.noop';
import Chip from '../Chip';

import styles from './Participants.module.scss';

export type Action = {
  name: string,
  value: string
}

type Props = {
  chips: Array<{id: string, label: string}>,
  className?: string,
  children: Node,
  name: string,
  onDelete: Action => void,
};


const Participants = ({
  chips, onDelete, className, children, name, ...restProps
}: Props) => {
  // TODO: need fix. on every render new anonymous function created
  const onDeleteWrap = onDelete ? (id) => onDelete(
    { name, value: id },
  ) : noop;

  return (
    <div className={classNames(styles.participants, className)} {...restProps}>
      {children}
      <div className={styles['chips-list']} data-test="chips-list">
        {Array.isArray(chips) && chips.map((item) => (
          <Chip
            key={item.id}
            onDelete={onDeleteWrap}
            title={item.label}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

Participants.defaultProps = {
  className: '',
};

export default Participants;
