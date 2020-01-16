import React from 'react';
import { Link } from 'react-router-dom';

class ProjectIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.revealDropdown = this.revealDropdown.bind(this);
    this.removeProject = this.removeProject.bind(this);
  };

  removeProject(e){
    e.stopPropagation();
    this.props.deleteProject(this.props.project.id);
  }

  revealDropdown(project) {
    $(`.project-dropdown`).removeClass('reveal-dropdown')
    $(`#project-dropdown-${project.id}`).addClass('reveal-dropdown')
  }

  render() {
    const { project, key, deleteProject, updateProject } = this.props;
    return (
      <div key={project.id} className="project-tile">
        <svg onClick={() => this.revealDropdown(project)} id={`ellipsis-${project.id}`} className="ellipsis" viewBox="0 0 32 32" tabIndex="0" focusable="false">
          <path d="M16,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S14.3,13,16,13z M3,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S1.3,13,3,13z M29,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S27.3,13,29,13z"></path>
        </svg>
        <div id={`project-dropdown-${project.id}`} className={`project-dropdown`}>
          <div className="dropdown-item" onClick={() => updateProject(project.id)}>Edit Project</div>
          <div className="dropdown-item" onClick={this.removeProject}>Delete Project</div>
        </div>
        <div className="tile-card">
          <svg className="project-icon" viewBox="0 0 32 32" tabIndex="0" focusable="false">
            <path d="M 26 2 H 6 C 2.7 2 0 4.7 0 8 v 14 c 0 3.3 2.7 6 6 6 h 20 c 3.3 0 6 -2.7 6 -6 V 8 C 32 4.7 29.3 2 26 2 Z M 30 22 c 0 2.2 -1.8 4 -4 4 H 6 c -2.2 0 -4 -1.8 -4 -4 V 8 c 0 -2.2 1.8 -4 4 -4 h 20 c 2.2 0 4 1.8 4 4 V 22 Z M 26 9 c 0 0.6 -0.4 1 -1 1 H 13 c -0.6 0 -1 -0.4 -1 -1 s 0.4 -1 1 -1 h 12 C 25.6 8 26 8.4 26 9 Z M 12 15 c 0 -0.6 0.4 -1 1 -1 h 6 c 0.6 0 1 0.4 1 1 s -0.4 1 -1 1 h -6 C 12.4 16 12 15.6 12 15 Z M 24 21 c 0 0.6 -0.4 1 -1 1 H 13 c -0.6 0 -1 -0.4 -1 -1 s 0.4 -1 1 -1 h 10 C 23.6 20 24 20.4 24 21 Z M 9.2 9 c 0 0.7 -0.5 1.2 -1.2 1.2 S 6.8 9.7 6.8 9 S 7.3 7.8 8 7.8 S 9.2 8.3 9.2 9 Z M 9.2 15 c 0 0.7 -0.5 1.2 -1.2 1.2 S 6.8 15.7 6.8 15 s 0.5 -1.2 1.2 -1.2 S 9.2 14.3 9.2 15 Z M 9.2 21 c 0 0.7 -0.5 1.2 -1.2 1.2 S 6.8 21.7 6.8 21 s 0.5 -1.2 1.2 -1.2 S 9.2 20.3 9.2 21 Z"></path>
          </svg>
        </div>
        <div className="tile-name">{project.name}</div>
      </div>
    )
  }
}

export default ProjectIndexItem;

