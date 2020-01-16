import React from 'react';
import { Link } from 'react-router-dom';
import ProfileContainer from './profile-container';

export default ({ currentUser, openModal }) => {

  return (
    <div className="header">
      <div className="home">
        Home
      </div>
      <div>
        <ProfileContainer />
      </div>
    </div>
  )
}