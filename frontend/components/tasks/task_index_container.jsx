import { connect } from "react-redux";
import TaskIndex from "./task_index";
import { updateSection } from "../../actions/section_actions";
import { requestTasks, deleteTask } from "../../actions/task_actions";

const mapStateToProps = (state, ownProps) => ({
  tasks: state.entities.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTasks: (sectionId) => dispatch(requestTasks(sectionId)),
  deleteTask: (taskId) => dispatch(deleteTask(taskId)),
  updateSection: (section) => dispatch(updateSection(section)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskIndex);