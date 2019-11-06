
// @flow
import React, { useState } from 'react';
import { type RouterHistory } from 'react-router-dom';
import classNames from 'classnames';
import { useTable, useBlockLayout, useResizeColumns } from 'react-table';
import Paginate from './Paginate';
import styles from './TablePaginate.module.scss';
import type { ItemTableType } from './types';

type ColumnType = {
  Header: string,
  accessor?: string,
  columns?: Array<{ Header?: string, accessor?: string }>
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
  pageSize?: number,
  getNumber?: (number) => void,
  columns: Array<ColumnType>,
  manual?: boolean,
  count?: number,
  history: RouterHistory
};

const getPageItems = (array: Array<any>, chunkSize: number): Array<any> => {
  const result = [];
  const maxLength = array.length;

  for (let item = 0; item < maxLength; item += chunkSize) {
    result.push(array.slice(item, item + chunkSize));
  }

  return result;
};

function deleteStyle(props: { [string]: mixed }) {
  const { style, ...data } = props;
  return data;
}

const Table = (
  {
    columns, data, history, ...restProps
  }: { columns: Array<ColumnType>, data: Array<any>, history: RouterHistory },
) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useBlockLayout,
    useResizeColumns,
  );
  return (
    <table {...getTableProps()} {...restProps} className={styles.table_paginate}>
      <thead className={styles.thead}>
        {headerGroups.map((headerGroup) => {
          const { style, ...dataHead } = headerGroup.getHeaderGroupProps();
          return (
            <tr {...dataHead} className={styles.tr}>
              {headerGroup.headers.map((column) => (
                <th {...deleteStyle(column.getHeaderProps())} className={styles.th}>
                  {column.render('Header')}
                  {/* {...column.getResizerProps()} */}
                  <div
                    className={
                      classNames(styles.resizer, { [styles.isResizing]: column.isResizing })
                    }
                  />
                </th>
              ))}
            </tr>
          );
        })}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map(
          (row) => prepareRow(row) || (
            <tr
              onClick={() => row.original.url && history.push(row.original.url)}
              {...deleteStyle(row.getRowProps())}
              className={styles.content}
            >
              {row.cells.map((cell) => (
                <td {...deleteStyle(cell.getCellProps())} className={classNames(styles.td, styles['comment-table_paginate'])}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};


const TablePaginate = ({
  classNamePaginate,
  className,
  style,
  stylePaginate,
  activeIndex,
  items,
  getNumber,
  pageSize,
  columns,
  manual,
  count,
  history,
  ...restProps
}: Props) => {
  const [index, setIndex] = useState(activeIndex || 1);

  const togglePage = (idx: number) => {
    if (typeof getNumber === 'function' && idx !== index) {
      getNumber(idx);
    }
    if (!manual) {
      setIndex(idx);
    }
  };

  const data = manual ? items : getPageItems(items, Number(pageSize))[index - 1];

  return (
    <div>
      <Paginate
        className={classNamePaginate}
        style={stylePaginate}
        count={count || Math.ceil(items.length / Number(pageSize))}
        togglePage={togglePage}
        activeNum={index}
      />
      <Table
        style={style}
        className={className}
        columns={columns}
        data={data}
        history={history}
        {...restProps}
      />
    </div>
  );
};

TablePaginate.defaultProps = {
  classNamePaginate: '',
  className: '',
  stylePaginate: {},
  style: {},
  activeIndex: 1,
  pageSize: 1,
  getNumber: () => {},
  manual: false,
  count: null,
};

export default TablePaginate;
