// @flow
import {
  put,
  takeEvery,
  takeLatest,
  call,
  all,
  delay,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { Toast } from 'ui-kit';
import history from 'utils/history';
import {
  fetchDeals,
  fetchUpdateDeal,
  fetchCreateDeal,
  fetchDeleteDeals,
} from '../api/fetchDealsApi';
import type { CreateDealType } from './types';
import type { ColumnType, DealType } from '../../types';
import type {
  UpdateDealReorderType,
  PropsFilterDeals,
} from '../actions/types';
import getRoute from '../../helpers/getRoute';

export function* getDealsSaga(action: {
  type: 'GET_DEALS_REQUEST',
  payload: {
    columns: {
      [string]: ColumnType,
    },
    returnDeals: (Array<DealType>) => void,
    props: PropsFilterDeals
  }
}): Saga<void> {
  try {
    const { returnDeals, props } = action.payload;
    const deals = yield call(fetchDeals, props);
    const objCrm = {};
    const newColumns = action.payload.columns || { taskIds: [] };
    deals.forEach((item, task) => {
      objCrm[deals[task].id] = deals[task];
      if (newColumns[deals[task].stage.id]) {
        newColumns[deals[task].stage.id].taskIds.push(deals[task].id);
      }
    });
    if (returnDeals && typeof returnDeals === 'function') {
      returnDeals(deals);
    }
    yield put({
      type: 'GET_DEALS_SUCCESS',
      payload: {
        deals: objCrm,
        columns: newColumns,
      },
    });
  } catch (error) {
    Toast.push({ message: String(error), type: 'danger' });
    yield put({ type: 'GET_DEALS_FAIL' });
  }
}

export function* updateDealReorderSaga(action: UpdateDealReorderType): Saga<void> {
  const {
    columns, element,
  } = action.payload.props;
  try {
    yield call(fetchUpdateDeal, action.payload.data);
  } catch (error) {
    // toggleModalShow(true, error.message);
    Toast.push({ message: String(error), type: 'danger' });
    const newState = {
      columns: {
        ...columns,
      },
    };
    yield put({ type: 'REORDER_CARDS_COLUMNS', payload: newState.columns });
    element.classList.add('error-drag-column');
    yield delay(500);
    element.classList.remove('error-drag-column');
  }
}

export function* updateDealSaga(action: {
  type: 'UPDATE_DEAL_REQUEST',
  payload: {
    data: DealType,
    returnUpdated?: (deal: DealType) => void,
  }
}): Saga<void> {
  try {
    const response = yield call(fetchUpdateDeal, action.payload.data);
    if (typeof action.payload.returnUpdated === 'function') {
      action.payload.returnUpdated(response);
    }
    yield put({ type: 'UPDATE_DEAL_SUCCESS', payload: response });
    history.push(getRoute(`/details/${response.title.replace(/\s/g, '_').replace('/', '&')}`));
  } catch (error) {
    Toast.push({ message: String(error), type: 'danger' });
    yield put({ type: 'UPDATE_DEAL_FAIL' });
  }
}

export function* createDealSaga(action: {
  type: 'CREATE_DEAL_REQUEST',
  payload: {
    data: CreateDealType,
    returnCreated?: (DealType) => void
  }
}): Saga<void> {
  try {
    const response = yield call(fetchCreateDeal, action.payload.data);
    if (typeof action.payload.returnCreated === 'function') {
      action.payload.returnCreated(response);
    }
    yield put({ type: 'CREATE_DEAL_SUCCESS', payload: response });
    history.push(getRoute('/'));
  } catch (error) {
    Toast.push({ message: String(error), type: 'danger' });
    yield put({ type: 'CREATE_DEAL_FAIL' });
  }
}

export function* deleteDealSaga(action: {
  type: 'DELETE_DEAL_REQUEST',
  payload: { id: string }
}): Saga<void> {
  try {
    yield call(fetchDeleteDeals, action.payload);
    history.push(getRoute('/'));
  } catch (error) {
    Toast.push({ message: String(error), type: 'danger' });
    yield put({ type: 'DELETE_DEAL_FAIL' });
  }
}

export default function* watchDealsSaga(): any {
  yield all([
    takeLatest('GET_DEALS_REQUEST', getDealsSaga),
    takeEvery('UPDATE_DEAL_REORDER_REQUEST', updateDealReorderSaga),
    takeEvery('UPDATE_DEAL_REQUEST', updateDealSaga),
    takeEvery('CREATE_DEAL_REQUEST', createDealSaga),
    takeEvery('DELETE_DEAL_REQUEST', deleteDealSaga),
  ]);
}
