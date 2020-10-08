import { connect } from "react-redux";
import SidebarProjectIndex from "./sidebar_project_index";
import { requestProjects } from "../../actions/project_actions";

const mapStateToProps = (state) => ({
  projects: state.entities.projects,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProjects: () => dispatch(requestProjects()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarProjectIndex);
