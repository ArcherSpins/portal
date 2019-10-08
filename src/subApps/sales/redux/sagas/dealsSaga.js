// @flow
import {
  put,
  takeEvery,
  call,
  all,
  delay,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
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
    // TODO: refactor this to more readable format
    for (let task = 0; task < deals.length; task += 1) {
      objCrm[deals[task].id] = deals[task];
      try {
        newColumns[deals[task].stage.id].taskIds.push(deals[task].id);
      } catch (err) {
        // TODO: FIX THIS
        // eslint-disable-next-line no-continue
        continue;
      }
    }
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
    yield put({ type: 'OPEN_ERROR_ALERT', payload: error.message });
    yield put({ type: 'GET_DEALS_FAIL' });
    yield delay(3500);
    yield put({ type: 'CLOSE_ERROR_ALERT' });
  }
}

export function* updateDealReorderSaga(action: UpdateDealReorderType): Saga<void> {
  const {
    toggleModalShow, columns, element,
  // $FlowFixMe
  } = action.payload.props;
  try {
    // $FlowFixMe
    yield call(fetchUpdateDeal, action.payload.data);
  } catch (error) {
    toggleModalShow(true, error.message);
    const newState = {
      columns: {
        ...columns,
      },
    };
    yield put({ type: 'OPEN_ERROR_ALERT', payload: error.message });
    yield put({ type: 'REORDER_CARDS_COLUMNS', payload: newState.columns });
    yield delay(3500);
    yield put({ type: 'CLOSE_ERROR_ALERT' });
    // $FlowFixMe
    element.classList.add('error-drag-column');
    yield delay(500);
    // $FlowFixMe
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
    // $FlowFixMe
    const response = yield call(fetchUpdateDeal, action.payload.data);
    if (typeof action.payload.returnUpdated === 'function') {
      action.payload.returnUpdated(response);
    }
    yield put({ type: 'UPDATE_DEAL_SUCCESS', payload: response });
    history.push(response.title.replace(/\s/g, '_').replace('/', '&'));
  } catch (error) {
    yield put({ type: 'OPEN_ERROR_ALERT', payload: error.message });
    yield put({ type: 'UPDATE_DEAL_FAIL' });
    yield delay(3500);
    yield put({ type: 'CLOSE_ERROR_ALERT' });
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
    history.push('/crm');
  } catch (error) {
    yield put({ type: 'OPEN_ERROR_ALERT', payload: error.message });
    yield put({ type: 'CREATE_DEAL_FAIL' });
    yield delay(3500);
    yield put({ type: 'CLOSE_ERROR_ALERT' });
  }
}

export function* deleteDealSaga(action: {
  type: 'DELETE_DEAL_REQUEST',
  payload: { id: string }
}): Saga<void> {
  try {
    yield call(fetchDeleteDeals, action.payload);
    history.push('/crm');
  } catch (error) {
    yield put({ type: 'OPEN_ERROR_ALERT', payload: error.message });
    yield put({ type: 'DELETE_DEAL_FAIL' });
    yield delay(3500);
    yield put({ type: 'CLOSE_ERROR_ALERT' });
  }
}

export default function* watchDealsSaga(): any {
  yield all([
    takeEvery('GET_DEALS_REQUEST', getDealsSaga),
    takeEvery('UPDATE_DEAL_REORDER_REQUEST', updateDealReorderSaga),
    takeEvery('UPDATE_DEAL_REQUEST', updateDealSaga),
    takeEvery('CREATE_DEAL_REQUEST', createDealSaga),
    takeEvery('DELETE_DEAL_REQUEST', deleteDealSaga),
  ]);
}
