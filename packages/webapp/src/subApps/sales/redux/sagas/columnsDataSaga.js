// @flow
import {
  put,
  takeEvery,
  call,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { fetchColumnsData } from '../api/fetchColumnsData';
import type { ColumnType, DealType } from '../../types';

export function* getColumnsDataSaga(action: {
  type: 'GET_COLUMNS_DATA_REQUEST',
  payload: {
    returnColumns: (Array<ColumnType>, { [string]: DealType }) => void
  }
}): Saga<void> {
  try {
    const response = yield call(fetchColumnsData);

    const columnsData = response;
    const columnsState = {};
    const columnsOrderData = [];

    for (let i = 0; i < columnsData.length; i += 1) {
      if (columnsData[i].displayed) {
        columnsData[i].taskIds = [];
        columnsData[i].index = i;
        columnsState[columnsData[i].id] = columnsData[i];
        columnsOrderData.push(columnsData[i].id);
      }
    }

    if (action.payload && typeof action.payload.returnColumns === 'function') {
      action.payload.returnColumns(response, columnsState);
    }

    yield put({
      type: 'GET_COLUMNS_DATA_SUCCESS',
      payload: {
        columns: columnsState,
        columnOrder: columnsOrderData,
        columnsData: response,
      },
    });

    // yield put({
    //   type: 'GET_DEALS_REQUEST',
    //   payload: {
    //     columns: columnsState,
    //   },
    // });
  } catch (error) {
    yield put({ type: 'GET_COLUMNS_DATA_FAIL' });
  }
}

export default function* watchColumnsSaga(): any {
  yield all([
    takeEvery('GET_COLUMNS_DATA_REQUEST', getColumnsDataSaga),
  ]);
}
