// @flow
import type { Position } from '../../types';

// eslint-disable-next-line import/prefer-default-export
export const getPositions = (positions: Array<Position>): {
  type: 'GET_POSITIONS_REQUEST',
  payload: Array<Position>
} => ({
  type: 'GET_POSITIONS_REQUEST',
  payload: positions,
});
