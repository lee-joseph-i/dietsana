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

  // demo(e){
  //   e.preventDefault();
  //   this.setState({email: 'josephlee@dietsana.com', password: ''});
  //   return setTimeout( () => {
  //     this.props.processForm(this.state);
  //     this.props.closeModal();
  //     this.props.history.push('/app');
  //   }, 240);
  // }


  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
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
            <p className="errorlist">{this.renderErrors()}</p>
            <br />
            <br />
            <label className="formbox">Email Address <br />
              <input placeholder="name@company.com" onfocus="this.placeholder = ''" type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
              />
            </label>
            <br />
            <label className="formbox">Password <br />
              <input placeholder="Password" onfocus="this.placeholder = ''" className="formbox" type="password"
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
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
