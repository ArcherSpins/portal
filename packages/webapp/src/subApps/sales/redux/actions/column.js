// @flow
import type { ColumnType } from '../../types';

// eslint-disable-next-line import/prefer-default-export
export const getColumnsDataAction = (returnColumns: (Array<ColumnType>) => void) => ({
  type: 'GET_COLUMNS_DATA_REQUEST',
  payload: {
    returnColumns,
  },
});
