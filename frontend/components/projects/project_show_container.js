import React from "react";
import { connect } from "react-redux";
import ProjectShow from "./project_show";
import { requestProject } from "../../actions/project_actions";
import { openModal } from "../../actions/modal_actions";

const mapStateToProps = (state, ownProps) => {
  return {
  project: state.entities.projects[ownProps.match.params.projectId],
  }
};

const mapDispatchToProps = (dispatch) => ({
  requestProject: (projectId) => dispatch(requestProject(projectId)),
  createProject: (
    <div
      className="ps-nav-dropdown-content-item"
      onClick={() => dispatch(openModal("create-project"))}
    >
      New Project
    </div>
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectShow);
