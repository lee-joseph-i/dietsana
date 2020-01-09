import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';

const entitiesReducer = combineReducers({
  modal: modalReducer
});

export default entitiesReducer;