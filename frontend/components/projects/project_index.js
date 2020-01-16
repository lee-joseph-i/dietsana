import React from 'react';
import { Link } from 'react-router-dom';
import ProjectIndexItem from './project_index_item';

class ProjectIndex extends React.Component{
  constructor(props){
    super(props);
  };

  componentDidMount(){
    this.props.requestProjects();
    let that = this;
    $('#new-project').click(function () {
      that.props.openModal('createProject');
    });
  }

  render(){
    const { projects, updateProject, deleteProject, openModal } = this.props;
    return(
      <div className="home-body" id="home-body">
        <div className="project-list">
          {
            projects.map((project, i) => (
              <ProjectIndexItem 
                key={i}
                project={project} 
                deleteProject={deleteProject} 
                updateProject={updateProject}
                openModal={openModal}
              />
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

