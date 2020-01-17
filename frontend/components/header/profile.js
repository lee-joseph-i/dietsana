import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';

class Profile extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    let that = this;
    //reveal dropdown
    $('.profile-icon-parent').click( e => {
      e.stopPropagation();
      $('.profile-dropdown').addClass('profile-dropdown-reveal')
    });

    //remove dropdown if clicked outside
    $('.app').click(function (event) {
      if (!$(event.target).closest('.profile-dropdown').length && !$(event.target).is('.profile-dropdown')) {
        $('.profile-dropdown').removeClass('profile-dropdown-reveal')
      }
    });

    //hover name show (doesn't work yet)
    $(".profile-icon-parent").hover(
      function () {
        $(".profile-hover").addClass("profile-dropdown-reveal");
      },
      function () {
        $(".profile-hover").removeClass("profile-dropdown-reveal");
      }
    );

    //logout
    $('.profile-dropdown-item').click(function (e) {
      e.stopPropagation();
      that.props.logout();
    })

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
        <div className="profile-dropdown profile-dropdown-hide">
          <div className="profile-dropdown-item">Log Out</div>
        </div>
      </div>
    )
  }
  
}

export default Profile;