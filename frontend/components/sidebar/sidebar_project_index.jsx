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
    return(
      <div>
        <SidebarProjectIndexItem />
      </div>
    )
  };
};

export default SidebarProjectIndex;
