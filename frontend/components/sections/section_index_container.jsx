import { connect } from 'react-redux';
import SectionIndex from './section_index';
import { requestProject, updateProject } from '../../actions/project_actions';
import { withRouter } from 'react-router-dom';
import {
  requestSections,
  createSection,
  updateSection,
  deleteSection
} from '../../actions/section_actions';
import { createTask, updateTask } from '../../actions/task_actions';

const mapStateToProps = state => ({
  sections: state.entities.sections,
  tasks: state.entities.tasks,
});

const mapDispatchToProps = dispatch => ({
  requestSections: projectId => dispatch(requestSections(projectId)),
  createTask: task => dispatch(createTask(task)),
  updateTask: task => dispatch(updateTask(task)),
  createSection: section => dispatch(createSection(section)),
  updateSection: section => dispatch(updateSection(section)),
  updateProject: project => dispatch(updateProject(project)),
  requestProject: projectId => dispatch(requestProject(projectId)),
  deleteSection: sectionId => dispatch(deleteSection(sectionId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SectionIndex));