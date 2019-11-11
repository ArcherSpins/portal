// @flow
import {
  put,
  takeEvery,
  call,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { fetchChannelsData } from '../api/fetchChannelsApi';
import type { ChannelType } from '../../types';

export function* getChannelSaga(action: {
  type: 'GET_CHANNELS_REQUEST',
  payload?: (ChannelType) => void
}): Saga<void> {
  try {
    const response = yield call(fetchChannelsData);
    if (action.payload && typeof action.payload === 'function') {
      action.payload(response);
    }
    yield put({ type: 'GET_CHANNELS_SUCCESS', payload: response });
  } catch (error) {
    yield put({ type: 'GET_CHANNELS_FAIL' });
  }
}

export default function* watchChannelSaga(): any {
  yield all([
    takeEvery('GET_CHANNELS_REQUEST', getChannelSaga),
  ]);
}
