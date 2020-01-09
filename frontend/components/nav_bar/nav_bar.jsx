import React from 'react';
import { Link } from 'react-router-dom';

export default ({ currentUser }) => {
  const display = !!currentUser ? (
    <div>
      <Link className="login" to="/app">Go to my Dietsana</Link>
    </div>
  ) : (
      <div>
        <Link className="login" to="/login">Log In</Link>
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
