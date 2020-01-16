import { connect } from 'react-redux';
import ProjectShow from './project_show';
import { requestProject } from '../../actions/project_actions';

const mapStateToProps = (state, ownProps) => ({
  // project: state.projects[ownProps.match.params.projectId]
});

const mapDispatchToProps = dispatch => ({
  // requestProject: projectId => dispatch(requestProject(projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectShow);