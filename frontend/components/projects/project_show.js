import React from 'react';
import { Link } from 'react-router-dom';

class ProjectShow extends React.Component {

  // componentDidMount() {
  //   this.props.requestProject(this.props.match.params.projectId)
  // }

  render() {
    const { project } = this.props;

    return (
      <div>
        <div>sad show page is sad</div>
        {/* {project.id}
        {project.name}
        {project.description}
        {project.owner_id}
        {project.creator_id} */}
        <div>
         <Link to='/app'>Back to Home</Link>
        </div>
      </div>
    )
  }
}

export default ProjectShow;