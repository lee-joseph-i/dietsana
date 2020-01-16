import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import projectIdReducer from './project_id_reducer';

export default combineReducers({
  modal: modalReducer,
  projectId: projectIdReducer

});
