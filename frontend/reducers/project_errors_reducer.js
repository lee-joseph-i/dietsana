import {
  RECEIVE_PROJECT_ERROR,
  CLEAR_ERRORS
} from '../actions/project_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROJECT_ERROR:
      return action.errors;
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};
