import React from "react";
import SectionIndexContainer from "../sections/section_index_container";

class ProjectShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestProject(this.props.match.params.projectId);
  }

  componentDidUpdate(prevProps) {
    //this is not the problem, in fact i could comment out this entire method and sections can still be re-ordered
    if (
      prevProps.match.params.projectId !== this.props.match.params.projectId
    ) {
      this.props.requestProject(this.props.match.params.projectId);
    }
  }

  render() {
    if (!this.props.project) return null;
    const { project, createProject, closeModal } = this.props;
    return (
      <div className="project-show-parent">
        <div className="project-show-all">
          {/* <div id="ps-sidebar-container" className="side-bar-container">
            <SideBarContainer />
          </div> */}
          <div className="project-show-main">
            {/* <div className="project-show-navbar">
              <ProjectShowNavBarContainer
                project={project}
                createProject={createProject}
                closeModal={closeModal}
              />
            </div> */}
            <div className="project-show-contents">
              <SectionIndexContainer
                projectId={this.props.match.params.projectId}
                project={this.props.project}
                sectionOrder={this.props.project.section_order}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectShow;
