import React from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';

const users = [
  { label: "Joseph Lee", value: 1 },
  { label: "Helen Yu", value: 2 },
  { label: "Christable Lee", value: 3}
];

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
    if (field == 'owner') {
      return e => this.setState({
        owner: {
          first_name: e.currentTarget.value.split(' ')[0], 
          last_name: e.currentTarget.value.split(' ')[1]
        }
      })
    };

    return e => this.setState({
      [field]: e.currentTarget.value
    });
    
  }

  handleSubmit(e){
    e.preventDefault();
    // change your state shape
    // first_naem: Joseph
    // last_name: Lee
    const project = Object.assign({}, this.state);
    this.props.updateProject(project)
      .then(this.props.closeModal)
      .then(
        $(`.project-dropdown`).removeClass('reveal-dropdown')
      )
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
            <br/>
            <label className="formbox">Owner <br />
              {/* <input type="text"
                value={ this.state.owner ? this.state.owner.first_name + ' ' +this.state.owner.last_name : ''}
                onChange={this.update('owner')}
                className="login-input"
              /> */}
              <div className="owner-dropdown">
                <Select options={users} />
              </div>
            </label>
            <br />
            <label className="formbox">Description <br />
              <textarea
                value={this.state.description}
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
