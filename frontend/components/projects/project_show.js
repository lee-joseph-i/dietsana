import React from 'react';
import { Link } from 'react-router-dom';

class ProjectShow extends React.Component {

  // componentDidMount() {
  //   this.props.requestProject(this.props.match.params.projectId)
  // }

  render() {
    const { project } = this.props;

    return (
      <div className="construction">
        <div>Under Construction</div>
      </div>
    )
  }
}

export default ProjectShow;