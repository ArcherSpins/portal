// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import Paginate from './Paginate';
import ItemTable from './Item';
import styles from './TablePaginate.module.scss';

type Props = {
  classNamePaginate?: string,
  stylePaginate?: {
    [string]: number | string,
  },
  style?: {
    [string]: number | string,
  },
  className?: string,
};

export default class TablePaginate extends Component<Props> {
  static defaultProps = {
    classNamePaginate: '',
    className: '',
    stylePaginate: {},
    style: {},
  }

  render() {
    const {
      classNamePaginate,
      className,
      style,
      stylePaginate,
    } = this.props;
    return (
      <div>
        <Paginate
          className={classNamePaginate}
          style={stylePaginate}
          count={5}
          togglePaginate={() => {}}
          activeNum={1}
        />
        <table style={style} className={classNames(styles.table_paginate, className)}>
          <thead>
            <tr>
              <th>#</th>
              <th>Assignee</th>
              <th>Timespent</th>
              <th>Spent Time</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            <ItemTable />
            <ItemTable />
            <ItemTable />
          </tbody>
        </table>
      </div>
    );
  }
}
