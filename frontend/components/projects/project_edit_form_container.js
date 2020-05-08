import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateProject } from '../../actions/project_actions';
import { closeModal } from '../../actions/modal_actions';
import ProjectEditForm from './project_edit_form';
import { clearErrors } from '../../actions/session_actions';
import { requestUsers } from '../../actions/user_action';
import Select from 'react-select';

const mapStateToProps = (state) => {
  return {
    users: state.entities.users,
    errors: state.errors.projects,
    project: state.entities.projects[state.ui.projectId],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestUsers: users => dispatch(requestUsers(users)),
    updateProject: project => dispatch(updateProject(project)),
    closeModal: () => {
      dispatch(closeModal());
      $(`.project-dropdown`).removeClass('reveal-dropdown')
    },
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectEditForm));