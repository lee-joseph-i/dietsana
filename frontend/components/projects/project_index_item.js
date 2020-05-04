import React from 'react';
import { Link } from 'react-router-dom';
import { Route, withRouter } from 'react-router-dom';

class ProjectIndexItem extends React.Component {
  constructor(props) {
    super(props);
    
  };

  eventListeners(){
    let that = this;

    //open edit modal
    $(`#project-edit-${that.props.project.id}`).click(function (event) {
      event.stopPropagation();
      that.props.openModal('editProject', that.props.project.id);
    });

    //link to show page
    $(`#project-tile-${that.props.project.id}`).click(function () {
      that.props.history.push(`/app/projects/${that.props.project.id}`); //need to figure out how to pass properties
      // <Link to={`/app/projects/${that.props.project.id}`} /> 
    });

    //open dropdown
    $(`#ellipsis-${that.props.project.id}`).click(function (e) {
      e.stopPropagation();
      $(`.project-dropdown`).removeClass('reveal-dropdown')
      $(`#project-dropdown-${that.props.project.id}`).addClass('reveal-dropdown')
    })

    //close dropdown if clicked outside
    $('.app').click(function (event) {
      if (!$(event.target).closest(`#project-dropdown-${that.props.project.id}`).length && !$(event.target).is(`#project-dropdown-${that.props.project.id}`)) {
        $(`.project-dropdown`).removeClass('reveal-dropdown')
      }
    });

    //delete project
    $(`#project-delete-${that.props.project.id}`).click(function (e) {
      e.stopPropagation();
      that.props.deleteProject(that.props.project.id);
    })
  }

  componentDidMount() {
    this.eventListeners();

  }

  componentDidUpdate(prevProps){
    if(prevProps.project.id !== this.props.project.id){
      this.eventListeners();
    }
  }


  render() {
    const { project, creator } = this.props;
    return (
      <div id={`project-tile-${project.id}`} key={project.id} className="project-tile">
        <svg id={`ellipsis-${project.id}`} className="ellipsis" viewBox="0 0 32 32" tabIndex="0" focusable="false">
          <path d="M16,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S14.3,13,16,13z M3,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S1.3,13,3,13z M29,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S27.3,13,29,13z"></path>
        </svg>
        <div id={`project-dropdown-${project.id}`} className={`project-dropdown`}>
          <div id={`project-edit-${project.id}`} className="dropdown-item">Edit Project</div>
          <div id={`project-delete-${project.id}`} className="dropdown-item">Delete Project</div>
        </div>
        <div className="tile-card">
          <svg className="project-icon" viewBox="0 0 32 32" tabIndex="0" focusable="false">
            <path d="M 26 2 H 6 C 2.7 2 0 4.7 0 8 v 14 c 0 3.3 2.7 6 6 6 h 20 c 3.3 0 6 -2.7 6 -6 V 8 C 32 4.7 29.3 2 26 2 Z M 30 22 c 0 2.2 -1.8 4 -4 4 H 6 c -2.2 0 -4 -1.8 -4 -4 V 8 c 0 -2.2 1.8 -4 4 -4 h 20 c 2.2 0 4 1.8 4 4 V 22 Z M 26 9 c 0 0.6 -0.4 1 -1 1 H 13 c -0.6 0 -1 -0.4 -1 -1 s 0.4 -1 1 -1 h 12 C 25.6 8 26 8.4 26 9 Z M 12 15 c 0 -0.6 0.4 -1 1 -1 h 6 c 0.6 0 1 0.4 1 1 s -0.4 1 -1 1 h -6 C 12.4 16 12 15.6 12 15 Z M 24 21 c 0 0.6 -0.4 1 -1 1 H 13 c -0.6 0 -1 -0.4 -1 -1 s 0.4 -1 1 -1 h 10 C 23.6 20 24 20.4 24 21 Z M 9.2 9 c 0 0.7 -0.5 1.2 -1.2 1.2 S 6.8 9.7 6.8 9 S 7.3 7.8 8 7.8 S 9.2 8.3 9.2 9 Z M 9.2 15 c 0 0.7 -0.5 1.2 -1.2 1.2 S 6.8 15.7 6.8 15 s 0.5 -1.2 1.2 -1.2 S 9.2 14.3 9.2 15 Z M 9.2 21 c 0 0.7 -0.5 1.2 -1.2 1.2 S 6.8 21.7 6.8 21 s 0.5 -1.2 1.2 -1.2 S 9.2 20.3 9.2 21 Z"></path>
          </svg>
        </div>
        <div className="tile-name">{project.name}</div>
        
      <span id={`project-owner-${project.id}`} className="project-owner">
          <div className="profile-icon-parent">
            <div className="profile-icon-child">
              {project.owner ? project.owner.first_name[0] : null}{project.owner ? project.owner.last_name[0] : "N/A"}
            </div>
        </div>
      </span>
  
      </div>
    )
  }
}

export default withRouter(ProjectIndexItem);

