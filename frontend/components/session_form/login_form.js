import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demo = this.demo.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount(){
    this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user)
      .then(this.props.closeModal)
      .then(() => this.props.history.push('/app'));
  }

  // demo login function

  demo(e){
    this.setState({email: 'josephlee@dietsana.com', password: 'password123'});
    return setTimeout( () => {
      this.props.processForm(this.state)
        .then(this.props.closeModal)
        .then(() => this.props.history.push('/app'));
    }, 1200);
  }

  renderErrors() {
    return (
      <p className="login-error">{this.props.errors[0]}</p>
    );
  }

  render() {
    return (
      <div className="login-form-container">
        <div onClick={this.props.closeModal} className="close-x">X</div>

        <form onSubmit={this.handleSubmit} className="login-form-box">
          <h3>Log in</h3>
          <br />
          <div className="login-form">
            {this.renderErrors()}
            <br />
            <br />
            <label className="formbox">Email Address <br />
              <input id="demo" placeholder="name@company.com" type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
              />
            </label>
            <br />
            <label className="formbox">Password <br />
              <input id="pw" placeholder="Password" className="formbox" type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <br />
              <input className="session-submit" type="submit" value="Log In" />
            <br />
            <section>
              <p>Don't have an account?</p>
              {this.props.otherForm}
            </section>
            <section>
              <p>Want to try a demo?</p>
              <p className="linkify" onClick={this.demo}>Click here</p>
            </section>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
