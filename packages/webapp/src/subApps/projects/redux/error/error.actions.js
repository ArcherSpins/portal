// eslint-disable-next-line import/prefer-default-export
// @flow
import type { ErrorAction } from './error.flow-types';

// eslint-disable-next-line import/prefer-default-export
export const clearErrors = (): ErrorAction => ({
  type: 'CLEAR_ERRORS',
});
