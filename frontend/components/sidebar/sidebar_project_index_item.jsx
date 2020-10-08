import React from "react";
import { Link, withRouter } from "react-router-dom";

class SidebarProjectIndexItem extends React.Component {
  constructor(props) {
    super(props);
  
    this.navigateToShow = this.navigateToShow.bind(this);
  }

  navigateToShow(){
    this.props.history.push(`/app/projects/${this.props.project.id}`);
  }

  render() {
    if(!this.props) return null;
    const { project } = this.props;

    return (
      <div
        onClick={this.navigateToShow}
      >
        { project.name }
      </div>
    );
  }
}

export default withRouter(SidebarProjectIndexItem);
