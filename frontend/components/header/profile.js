import React, { Profiler } from 'react';
import { Link } from 'react-router-dom';

class Profile extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    $('.profile-icon-parent').click(() => {
      $('.profile-dropdown').addClass('project-reveal-dropdown')
    })

    $('.app').click(function (event) {
      if (!$(event.target).closest(`.profile-dropdown`).length && !$(event.target).is(`.profile-dropdown`)) {
        $(`.profile-dropdown`).removeClass('project-reveal-dropdown')
      }
    });

  }

  render(){
    const { currentUser, openModal } = this.props;
    return (
      <div>
        <div className="profile-icon-parent">
          <div className="profile-icon-child">
            {currentUser.first_name[0] + currentUser.last_name[0]}
          </div>
        </div>
        <div className="profile-hover">
          <p>{`${currentUser.first_name} ${currentUser.last_name}`}</p>
        </div>
        <div className="profile-dropdown">
          <p>Log Out</p>
        </div>
      </div>
    )
  }
  
}

export default Profile;