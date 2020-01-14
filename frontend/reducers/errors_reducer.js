import { combineReducers } from 'redux';
import sessionErrorsReducer from '../reducers/session_errors_reducer';
import projectErrorsReducer from '../reducers/project_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  projects: projectErrorsReducer
})

export default errorsReducer;