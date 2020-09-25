import { connect } from "react-redux";
import SectionIndexItem from "./section_index_item";
import { updateSection, deleteSection } from "../../actions/section_actions";
import { requestTasks, deleteTask } from "../../actions/task_actions";
import { taskSelector } from "../../selectors/tasks_selectors.js";

const mapStateToProps = (state, ownProps) => {
  return {
    // tasks: state.entities.tasks,
    tasks: taskSelector(state, ownProps.sectionId),
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestTasks: (sectionId) => dispatch(requestTasks(sectionId)),
  deleteTask: (taskId) => dispatch(deleteTask(taskId)),
  updateSection: (section) => dispatch(updateSection(section)),
  deleteSection: (sectionId) => dispatch(deleteSection(sectionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionIndexItem);
