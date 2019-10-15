// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import Paginate from './Paginate';
import ItemTable from './Item';
import styles from './TablePaginate.module.scss';
import type { ItemTableType } from './types';

const chunkArray = (array, chunkSize) => {
  const result = [];
  const maxLength = array.length;

  for (let item = 0; item < maxLength; item += chunkSize) {
    result.push(array.slice(item, item + chunkSize));
  }

  return result;
};

type Props = {
  classNamePaginate?: string,
  stylePaginate?: {
    [string]: number | string,
  },
  style?: {
    [string]: number | string,
  },
  className?: string,
  items: Array<ItemTableType>,
  activeIndex?: number,
};

type State = {
  index: number
}

export default class TablePaginate extends Component<Props, State> {
  static defaultProps = {
    classNamePaginate: '',
    className: '',
    stylePaginate: {},
    style: {},
    activeIndex: 1,
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      index: props.activeIndex || 1,
    };
  }

  togglePaginate = (idx: number) => {
    this.setState({ index: idx });
  }

  render() {
    const {
      classNamePaginate,
      className,
      style,
      stylePaginate,
      items,
    } = this.props;
    const { index } = this.state;
    return (
      <div>
        <Paginate
          className={classNamePaginate}
          style={stylePaginate}
          count={Math.ceil(items.length / 3)}
          togglePaginate={this.togglePaginate}
          activeNum={index}
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
            {
              chunkArray(items, 3)[index - 1].map((item, i) => (
                <ItemTable index={i + 1} key={item.id} {...item} />
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}
