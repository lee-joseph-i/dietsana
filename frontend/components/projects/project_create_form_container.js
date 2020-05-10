import { connect } from 'react-redux';
import { createProject } from '../../actions/project_actions';
import { closeModal } from '../../actions/modal_actions';
import ProjectCreateForm from './project_create_form';
import { clearErrors } from '../../actions/session_actions';
import { requestUsers } from '../../actions/user_action';

const mapStateToProps = (state) => {
  return {
    users: state.entities.users,
    errors: state.errors.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestUsers: users => dispatch(requestUsers(users)),
    createProject: project => dispatch(createProject(project)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreateForm);
