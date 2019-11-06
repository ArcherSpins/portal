// @flow
import { createSelector } from 'reselect';

import type { State } from '../flow-state';

const selectError = (state) => state.error;

// eslint-disable-next-line import/prefer-default-export
export const selectServerError = createSelector<State, *, *, *, *, *, *, *, *>(
  [selectError],
  (error) => error,
);
