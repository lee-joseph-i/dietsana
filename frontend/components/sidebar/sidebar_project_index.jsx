import React from "react";
import SidebarProjectIndexItem from "./sidebar_project_index_item";

class SidebarProjectIndex extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.fetchProjects();
  };

  render() {
    if (!this.props) return null;
    const { projects } = this.props;

    return(
      <div>
        {
          Object.values(projects).map(project => (
            <SidebarProjectIndexItem 
              key={project.id}
              project={project}
            />
          ))
        }
      </div>
    )
  };
};

export default SidebarProjectIndex;
