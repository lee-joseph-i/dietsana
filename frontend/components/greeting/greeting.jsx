import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';

const Greeting = ({ currentUser, logout }) => {
  debugger
  const welcomeMessage = () => (
    <div>
      <h2>Welcome, {currentUser.username}!</h2>
      <button onClick={logout}>Log Out</button>
    </div>
  );

  return welcomeMessage();

  // const loginPage = () => (
  //   <div>
  //     <Link to='/signup'>Sign Up!</Link>
  //     <br />
  //     <Link to='/login'>Log In!</Link>
  //   </div>
  // );

  // return currentUser ? welcomeMessage() : loginPage();

}

export default Greeting;