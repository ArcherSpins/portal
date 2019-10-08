// @flow
import {
  put,
  takeEvery,
  call,
  all,
  delay,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import {
  fetchDeleteContact,
  fetchCreateContact,
  fetchUpdateContact,
} from '../api/fetchContactApi';
import type { ContactType } from '../../types';

export function* updateContactSaga(action: {
  type: 'UPDATE_CONTACT_REQUEST',
  payload: {
    id: string,
    value: string
  }
}): Saga<void> {
  try {
    const response = yield call(fetchUpdateContact, action.payload);
    // if (action.payload.returnContacts && typeof action.payload.returnContacts === 'function') {
    //   action.payload.returnContacts(response);
    // }
    yield put({ type: 'UPDATE_CONTACT_SUCCESS', payload: response });
  } catch (error) {
    yield put({ type: 'OPEN_ERROR_ALERT', payload: error.message });
    yield put({ type: 'UPDATE_CONTACT_FAIL' });
    yield delay(3500);
    yield put({ type: 'CLOSE_ERROR_ALERT' });
  }
}

export function* deleteContactSaga(action: {
  type: 'DELETE_CONTACT_REQUEST',
  payload: {
    id: string,
    returnContacts?: (Array<ContactType>) => void,
  }
}): Saga<void> {
  try {
    const response = yield call(fetchDeleteContact, { id: action.payload.id });
    if (action.payload.returnContacts && typeof action.payload.returnContacts === 'function') {
      action.payload.returnContacts(response);
    }
    yield put({ type: 'DELETE_CONTACT_SUCCESS', payload: response });
  } catch (error) {
    yield put({ type: 'OPEN_ERROR_ALERT', payload: error.message });
    yield put({ type: 'DELETE_CONTACT_FAIL' });
    yield delay(3500);
    yield put({ type: 'CLOSE_ERROR_ALERT' });
  }
}

export function* createContactSaga(action: {
  type: 'CREATE_CONTACT_REQUEST',
  payload: {
    dealId: string,
    parameterId: string,
    value: string,
  },
  contacts: Array<ContactType>
}): Saga<void> {
  try {
    const response = yield call(fetchCreateContact, action.payload);
    yield put({
      type: 'SET_CONTACTS',
      payload: [...action.contacts, response],
    });
  } catch (error) {
    yield put({ type: 'OPEN_ERROR_ALERT', payload: error.message });
    yield put({ type: 'CREATE_CONTACT_FAIL' });
    yield delay(3500);
    yield put({ type: 'CLOSE_ERROR_ALERT' });
  }
}

export default function* watchContactSaga(): any {
  yield all([
    takeEvery('DELETE_CONTACT_REQUEST', deleteContactSaga),
    takeEvery('CREATE_CONTACT_REQUEST', createContactSaga),
    takeEvery('UPDATE_CONTACT_REQUEST', updateContactSaga),
  ]);
}
