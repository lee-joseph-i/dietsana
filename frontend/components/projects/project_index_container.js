import { connect } from 'react-redux';
import ProjectIndex from './project_index';
import { updateProject, deleteProject } from '../../actions/project_actions';

const mapStateToProps = state => {
  return {
    projects: Object.values(state.entities.projects)
  };
};

const mapDispatchToProps = dispatch => ({
  updateProject: project => dispatch(updateProject(project)),
  deleteProject: projectId => dispatch(deleteProject(projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectIndex);