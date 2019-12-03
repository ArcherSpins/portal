// @flow
import type { JobsCurrentUserType } from '../../types/api';

export type State = {
  jobsForCurrentUser: Array<JobsCurrentUserType>
}

const initialState: State = {
  jobsForCurrentUser: [],
};

export default initialState;
