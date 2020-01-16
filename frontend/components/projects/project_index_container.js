import { connect } from 'react-redux';
import ProjectIndex from './project_index';
import { openModal, closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import { 
  clearErrors,
  createProject, 
  requestProjects, 
  updateProject, 
  deleteProject 
} from '../../actions/project_actions';

const mapStateToProps = state => {
  return {
    projects: Object.values(state.entities.projects),
    errors: state.errors.projects
  };
};

const mapDispatchToProps = dispatch => ({
  requestProjects: () => dispatch(requestProjects()),
  createProject: project => dispatch(createProject(project)),
  updateProject: project => dispatch(updateProject(project)),
  deleteProject: projectId => dispatch(deleteProject(projectId)),
  openModal: form => dispatch(openModal(form)),
  closeModal: () => dispatch(closeModal()),
  clearErrors: () => dispatch(clearErrors())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectIndex));