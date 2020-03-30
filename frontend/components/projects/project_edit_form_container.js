import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateProject } from '../../actions/project_actions';
import { closeModal } from '../../actions/modal_actions';
import ProjectEditForm from './project_edit_form';
import { clearErrors } from '../../actions/session_actions';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.projects,
    project: state.entities.projects[state.ui.projectId],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProject: project => dispatch(updateProject(project)),
    closeModal: () => {
      dispatch(closeModal());
      $(`.project-dropdown`).removeClass('reveal-dropdown')
    },
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectEditForm));