import React from 'react';

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }

  };

  render(){
    return (

      // session form css is not setup yet
      <div className="session-form">
        <h2>Log in!</h2>

        <form>
          <label>Username:
          <input
              type="text"
              value={this.state.username}
              onChange={this.handleInput('username')} /></label>
          <label>Password:
          <input
              type="password"
              value={this.state.password}
              onChange={this.handleInput('password')} />
            <button onClick={this.handleSubmit}>Sign Up</button></label>
        </form>
      </div>
    )
  }
}

export default Login;