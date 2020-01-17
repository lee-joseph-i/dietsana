import React from 'react';
import { Link } from 'react-router-dom';
import ProfileContainer from './profile-container';
import { Redirect, Route, withRouter } from 'react-router-dom';

export default ({ currentUser, openModal }) => {

  return (
    <div className="header">
      <div className="home">
        <Route exact path="/app" render={(props) => (
          "Home"
        )} />
        <Route path="/app/projects" render={(props) => (
          "Oh noes"
        )} />
      </div>
      <div>
        <ProfileContainer />
      </div>
    </div>
  )
}