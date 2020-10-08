import React from "react";
import { Link, withRouter } from "react-router-dom";

class SidebarProjectIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props) return null;
    const { project } = this.props;
    console.log(this.props)
    return (
      <div>
        { project.name }
      </div>
    );
  }
}

export default withRouter(SidebarProjectIndexItem);
