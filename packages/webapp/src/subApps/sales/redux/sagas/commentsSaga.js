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
  // fetchCommentsData,
  fetchCreateComment,
  fetchDeleteComment,
  fetchUpdateComment,
} from '../api/fetchCommentsApi';
import type { CommentType } from '../../types';

// export function* getCommentsSaga(action: {
//   type: 'GET_COMMENTS_REQUEST',
//   payload: {
//     idDeal: string,
//     returnComments?: (Array<CommentType>) => void
//   }
// }): Saga<void> {
//   try {
//     const response = yield call(fetchCommentsData, {
//       dealId: action.payload.idDeal,
//       limit: '15',
//       offset: '0',
//     });
//     if (action.payload.returnComments && typeof action.payload.returnComments === 'function') {
//       action.payload.returnComments(response);
//     }
//     yield put({ type: 'GET_COMMENTS_SUCCESS', payload: response.reverse() });
//   } catch (error) {
//     yield put({ type: 'OPEN_ERROR_ALERT', payload: error.message });
//     yield put({ type: 'GET_COMMENTS_FAIL' });
//     yield delay(3500);
//     yield put({ type: 'CLOSE_ERROR_ALERT' });
//   }
// }

export function* createCommentSaga(action: {
  type: 'CREATE_COMMENT_REQUEST',
  payload: {
    data: {
      dealId: string,
      content: string,
      limit: '15',
      offset: '0',
    },
    returnComment?: (CommentType) => void
  },
}): Saga<void> {
  try {
    const response = yield call(fetchCreateComment, action.payload.data);
    if (typeof action.payload.returnComment === 'function') {
      action.payload.returnComment(response);
    }
    yield put({ type: 'CREATE_COMMENT_SUCCESS', payload: response });
    yield put({ type: 'GET_DEAL_LOGS_REQUEST', payload: { dealID: action.payload.data.dealId } });
  } catch (error) {
    yield put({ type: 'OPEN_ERROR_ALERT', payload: error.message });
    yield put({ type: 'CREATE_COMMENT_FAIL' });
    yield delay(3500);
    yield put({ type: 'CLOSE_ERROR_ALERT' });
  }
}

export function* deleteCommentSaga(action: {
  type: 'DELETE_COMMENT_REQUEST',
  payload: string,
  dealId?: string
}): Saga<void> {
  try {
    const response = yield call(fetchDeleteComment, { id: action.payload });
    yield put({ type: 'DELETE_COMMENT_SUCCESS', payload: response });
    if (action.dealId) {
      yield put({ type: 'GET_DEAL_LOGS_REQUEST', payload: { dealID: action.dealId } });
    }
  } catch (error) {
    yield put({ type: 'OPEN_ERROR_ALERT', payload: error.message });
    yield put({ type: 'DELETE_COMMENT_FAIL' });
    yield delay(3500);
    yield put({ type: 'CLOSE_ERROR_ALERT' });
  }
}

export function* updateCommentSaga(action: {
  type: 'UPDATE_COMMENT_REQUEST',
  payload: {
    id: string,
    content: string
  },
}): Saga<void> {
  try {
    const response = yield call(fetchUpdateComment, action.payload);
    yield put({
      type: 'UPDATE_COMMENT_SUCCESS',
      payload: { id: action.payload.id, newComment: response },
    });
  } catch (error) {
    yield put({ type: 'OPEN_ERROR_ALERT', payload: error.message });
    yield put({ type: 'UPDATE_COMMENT_FAIL' });
    yield delay(3500);
    yield put({ type: 'CLOSE_ERROR_ALERT' });
  }
}

export default function* watchCommentSaga(): any {
  yield all([
    // takeEvery('GET_COMMENTS_REQUEST', getCommentsSaga),
    takeEvery('CREATE_COMMENT_REQUEST', createCommentSaga),
    takeEvery('DELETE_COMMENT_REQUEST', deleteCommentSaga),
    takeEvery('UPDATE_COMMENT_REQUEST', updateCommentSaga),
  ]);
}
