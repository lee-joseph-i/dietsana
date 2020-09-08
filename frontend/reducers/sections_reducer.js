import { 
  RECEIVE_SECTIONS, 
  RECEIVE_SECTION, 
  REMOVE_SECTION 
} from '../actions/section_actions';
import { RECEIVE_PROJECT } from '../actions/project_actions';

const sectionsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_SECTIONS:
      newState = Object.assign({}, state, action.sections);
      return newState;
    case RECEIVE_SECTION:
      newState[action.section.id] = action.section;
      return newState;
    case REMOVE_SECTION:
      delete newState[action.sectionId]
      return newState;
    case RECEIVE_PROJECT:
      newState = Object.assign({}, state, action.sections)
      return newState;
    default:
      return state;
  };
};

export default sectionsReducer;