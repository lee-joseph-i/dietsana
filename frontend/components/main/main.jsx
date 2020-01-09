import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';

class Main extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const { currentUser, logout } = this.props;

    return(
      <div>
        <h2>Welcome, {currentUser.username}!</h2>
        <button onClick={logout}>Log Out</button>
      </div>
    )
  }
}

export default Main;