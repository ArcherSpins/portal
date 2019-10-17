
// @flow
import React, { useState } from 'react';
import classNames from 'classnames';
// $FlowFixMe
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
  getNumberPaginate?: (number) => void,
  columns: Array<ColumnType>
};

const chunkArray = (array: Array<any>, chunkSize: number): Array<any> => {
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
  { columns, data, ...restProps }: { columns: Array<ColumnType>, data: Array<any> },
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
            <tr {...deleteStyle(row.getRowProps())} className={styles.tr}>
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
  getNumberPaginate,
  pageSize,
  columns,
  ...restProps
}: Props) => {
  const [index, toggleIndex] = useState(activeIndex || 1);

  const togglePaginate = (idx: number) => {
    if (typeof getNumberPaginate === 'function') {
      getNumberPaginate(idx);
    }
    toggleIndex(idx);
  };

  return (
    <div>
      <Paginate
        className={classNamePaginate}
        style={stylePaginate}
        count={Math.ceil(items.length / Number(pageSize))}
        togglePaginate={togglePaginate}
        activeNum={index}
      />
      <Table
        style={style}
        className={className}
        columns={columns}
        data={chunkArray(items, Number(pageSize))[index - 1]}
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
  getNumberPaginate: () => {},
};

export default TablePaginate;
