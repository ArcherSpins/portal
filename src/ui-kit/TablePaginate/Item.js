// @flow
import React from 'react';
import styles from './TablePaginate.module.scss';
import type { ItemTableType } from './types';

export default ({
  index,
  assignee,
  timespent,
  spentTime,
  comment,
}: {...ItemTableType, index: number}) => (
  <tr>
    <td>{index}</td>
    <td>{assignee}</td>
    <td>
      {timespent.time}
      &nbsp;
      {timespent.date}
    </td>
    <td>{spentTime}</td>
    <td title={comment} className={styles['comment-table_paginate']}>
      {comment}
    </td>
  </tr>
);
