import React from 'react';
import { Link } from 'react-router-dom';

// change to Class
// under ComponentDidMount, call fetchProjects (create in container first)
// 
class ProjectIndex extends React.Component{
  constructor(props){
    super(props);
    // this.state = this.props.requestProjects()
  };

  componentDidMount(){
    this.props.requestProjects();
    let that = this;
    $(document).ready(function () {
      $('#new-project').click(function () {
        that.props.openModal('createProject');
      });
    });
  }

  render(){
    const { projects, updateProject, deleteProject } = this.props;

    return(
      <div>
        <div className="project-list">
          {
            projects.map((project, i) => (
              // <ProjectItemIndex key={project.id} project={project} deleteProject={deleteProject} updateProject={updateProject}/>
              <div key={i} className="project-tile">
                <div className="tile-card">add image here</div>
                <div className="tile-name">{project.name}</div>
              </div>
            ))
          }
          <div id="new-project" className="project-tile">
            <div className="tile-card-new">
              <svg width="30px" height="30px">
                <path d="M 26 14 h -8 V 6 c 0 -1.1 -0.9 -2 -2 -2 l 0 0 c -1.1 0 -2 0.9 -2 2 v 8 H 6 c -1.1 0 -2 0.9 -2 2 l 0 0 c 0 1.1 0.9 2 2 2 h 8 v 8 c 0 1.1 0.9 2 2 2 l 0 0 c 1.1 0 2 -0.9 2 -2 v -8 h 8 c 1.1 0 2 -0.9 2 -2 l 0 0 C 28 14.9 27.1 14 26 14 Z" />
                Sorry, your browser does not support inline SVG.
              </svg>
            </div>
            <div className="tile-name">New Project</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectIndex;

