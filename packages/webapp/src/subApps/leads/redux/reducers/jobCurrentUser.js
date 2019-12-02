import initialState from './initialState';


export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_JOBS_FOR_CURRENT_USER_SUCCESS':
      return {
        ...state,
        jobsForCurrentUser: action.payload,
      };
    default: return state;
  }
};
