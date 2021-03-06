import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USERS } from '../actions/user_action';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, { [action.currentUser.id]: action.currentUser });
    case RECEIVE_USERS:
      return Object.assign({}, state, action.users);
    default:
      return state;
  }
}

export default usersReducer;