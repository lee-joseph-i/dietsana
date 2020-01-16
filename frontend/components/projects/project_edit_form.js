import React from 'react';
import { withRouter } from 'react-router-dom';

class ProjectEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.project;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const project = Object.assign({}, this.state);
    this.props.createProject(project)
      .then(this.props.closeModal)
  }

  renderErrors() {
    return (
      <p className="login-error">{this.props.errors[0]}</p>
    );
  }

  render() {
    debugger;
    return (
      <div className="login-form-container">
        <div onClick={this.props.closeModal} className="close-x">X</div>

        <form onSubmit={this.handleSubmit} className="login-form-box">
          <h3>Edit project details</h3>
          <br />
          <div className="login-form">
            {this.renderErrors()}
            <br />
            <br />
            <label className="formbox">Project name <br />
              <input type="text"
                value={this.state.name}
                onChange={this.update('name')}
                className="login-input"
              />
            </label>
            <br />
            <label className="formbox">Description <br />
              <textarea
                value={this.state.password}
                onChange={this.update('description')}
                className="login-input"
              />
            </label>
            <br />
            <input className="session-submit" type="submit" value="Edit project" />
            <br />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(ProjectEditForm);
