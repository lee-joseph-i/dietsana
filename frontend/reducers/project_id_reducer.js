import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

const projectIdReducer = (state = null, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return action.projectId;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}

export default projectIdReducer;