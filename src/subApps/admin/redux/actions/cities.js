// @flow
import type { CitiesTypeAction } from './types';

// eslint-disable-next-line import/prefer-default-export
export const getCitiesAction = (): CitiesTypeAction => ({
  type: 'GET_ALL_CITIES_REQUEST',
});
