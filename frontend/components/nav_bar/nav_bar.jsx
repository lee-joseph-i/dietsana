import React from 'react';
import { Link } from 'react-router-dom';

export default ({ currentUser, openModal }) => {
  const display = !!currentUser ? (
    <div>
      <Link className="login" to="/app">Go to my Dietsana</Link>
    </div>
  ) : (
      <div>
        <button className="login" onClick={() => openModal('login')}>Log In</button>
      </div>
    );
  return (
    <header className="nav-bar">
      <h1>Dietsana</h1>
      <div>
        {display}
      </div>
    </header>
  )
}
