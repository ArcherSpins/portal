// @flow
import {
  put,
  takeEvery,
  call,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import {
  fetchCitiesData,
} from '../api/citiesApi';

export function* getAllCities(): Saga<void> {
  try {
    const result = yield call(fetchCitiesData);
    yield put({
      type: 'GET_ALL_CITIES_SUCCESS',
      payload: result,
    });
  } catch (err) {
    yield put({ type: 'GET_ALL_CITIES_FAIL' });
    yield put({
      type: 'SHOW_ERROR_MESSAGE',
      payload: String(err),
    });
  }
}

export default function* watchCities(): Saga<void> {
  yield takeEvery('GET_ALL_CITIES_REQUEST', getAllCities);
}
