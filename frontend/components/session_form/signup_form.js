import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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

  renderErrors(field) {
    return(
      <ul>
        {
          this.props.errors.map((error, idx) => {
            if (error.includes(field)) {
              return (
                <p key={idx} className="errorlist">{error}</p>
              )
            }})
        }
      </ul>
    )
  }

  render() {
    return (
      <div className="login-form-container">
        <div onClick={this.props.closeModal} className="close-x">X</div>

        <form onSubmit={this.handleSubmit} className="login-form-box">
          <h3>Sign Up</h3>
          <br />
          <div className="login-form">
            <br />
            <div className="form-names">
              <label className="formbox">First Name <br/>
                {this.renderErrors('first')}
                <input placeholder="John" type="text"
                  value={this.state.first_name}
                  onChange={this.update('first_name')}
                  className="login-input"
                />
              </label>
              <label className="formbox">Last Name <br/>
                {this.renderErrors('last')}
                <input placeholder="Smith" type="text"
                  value={this.state.last_name}
                  onChange={this.update('last_name')}
                  className="login-input"
                />
              </label>
            </div>
            <br />
            <label className="formbox">Email Address <br/>
              {this.renderErrors('email')}
              <input placeholder="name@company.com" type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
              />
            </label>
            <br />
            <label className="formbox">Password <br/>
              {this.renderErrors('password')}
              <input placeholder="Password" type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <br />
            <input className="session-submit" type="submit" value="Sign Up" />
            <br />
            <section>
              <p>Already have an account?</p>
              {this.props.otherForm}
            </section>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
