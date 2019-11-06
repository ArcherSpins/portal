// @flow
import type { SpentTimeBoundsType } from '../../types';
import type { SpentTimeBoundsTypeAction } from './types';

export const getSpentTimeBounds = (): SpentTimeBoundsTypeAction => ({
  type: 'GET_SPENT_TIME_BOUNDS_REQUEST',
});

export const updateSpentTimeBounds = (data: SpentTimeBoundsType): SpentTimeBoundsTypeAction => ({
  type: 'UPDATE_SPENT_TIME_BOUNDS_REQUEST',
  payload: data,
});
