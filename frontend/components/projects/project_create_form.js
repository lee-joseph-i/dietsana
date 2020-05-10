import React from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { modifyUsers } from '../../selectors/users_selectors';

class ProjectCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      owner: {
        first_name: '',
        last_name: ''
      },
      description: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    this.props.requestUsers()
      .then((users) => {
        this.setState(Object.assign({}, this.state, { users: modifyUsers(users.users) }))
      });
  }

  update(field) {
    return e => {
      if (field == 'owner') {
        this.setState({
          owner: {
            first_name: e.label.split(' ')[0],
            last_name: e.label.split(' ')[1],
          },
          owner_id: e.value,
        })
      } else {
        this.setState({
          [field]: e.currentTarget.value
        })
      }
    };
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
    return (
      <div className="login-form-container">
        <div onClick={this.props.closeModal} className="close-x">X</div>

        <form onSubmit={this.handleSubmit} className="login-form-box">
          <h3>Add project details</h3>
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
                value={this.state.owner ? this.state.owner.first_name + ' ' + this.state.owner.last_name : ''}
                onChange={this.update('owner')}
                className="login-input"
              /> */}
              <div className="owner-dropdown">
                <Select
                  value={this.state.owner ? { label: this.state.owner.first_name + " " + this.state.owner.last_name, value: this.state.owner.id } : ''}
                  onChange={this.update('owner')}
                  options={this.state && this.state.users}
                />
              </div>
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
            <input className="session-submit" type="submit" value="Create project" />
            <br />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(ProjectCreateForm);
