import React from 'react';
import { Link } from 'react-router-dom';

export default ({ currentUser, openModal }) => {
  const display = !!currentUser ? (
    <div>
      <Link className="return" to="/app">Return to my Dietsana</Link>
    </div>
  ) : (
      <div>
        <button className="login" onClick={() => openModal('login')}>Log In</button>
        <button className="signup-navbar" onClick={() => openModal('signup')}>Try for free</button>
      </div>
    );
  return (
    <header className="nav-bar">
      <img src={window.logo} className="asana-logo"/>
      <div>
        {display}
      </div>
    </header>
  )
}
