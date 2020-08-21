# Maru
[Maru live link!](https://maru-sana.herokuapp.com/)</br>
![Maru landing page](https://user-images.githubusercontent.com/39147326/90926049-2ea79680-e3a7-11ea-8035-f823918d15b4.png)

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Features](#features)
4. [Future Direction](#future-direction)

## Introduction

The Maru project is an Asana-inspired project management tool designed to help teams organize, track, and manage their work. Users will be able to sign up and log in, create, edit and delete their own projects, view an index of all projects across users, and view details of individual projects.

## Technologies

**Backend** <br/> 
Maru uses PostgreSQL, Ruby on Rails, Node.js as the foundation to its backend.  User accounts and projects are stored in the Postgres database. User authentication is secured through standard OAuth hash and salt process.

**Frontend** <br/> 
Maru's frontend pages are rendered with React/Redux. Slices of state are curated for use across all React components, including the navbars, user profile modals, and individual projects.


## Features
* Landing Page - Rendition of Asana's own landing page. Videos and other elements can be viewed and toggled.

  ![landingvideos](https://user-images.githubusercontent.com/39147326/79030707-3fb9de80-7b4f-11ea-9eb4-be798313e923.gif)

* User Accounts - Sign up and login modals with their backend validations, with a demo login option available.

  ``` ruby
    # User model Backend
    def self.find_by_credentials(email, password)
      user = User.find_by(email: email)
      return nil unless user
      user.is_password?(password) ? user : nil
    end
    
    def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
    end
  ```

  ``` javascript
    // React sign up form submission Frontend
    handleSubmit(e) {
      e.preventDefault();
      const user = Object.assign({}, this.state);
      this.props.processForm(user)
        .then(this.props.closeModal)
        .then(() => this.props.history.push('/app'));
    }
  ```
  <img width="1000" alt="Sign Up modal" src="https://user-images.githubusercontent.com/39147326/78844328-4a8f3a80-79ba-11ea-9828-0f410daea9fa.png">

* Projects - Projects have creators (user creates projects), owners (users can assign projects to existing users in the database), names and descriptions. All project fields can be edited, and projects can be deleted.

  ``` javascript
    // Projects index React component
    render(){
    const { projects, updateProject, deleteProject, openModal } = this.props;
    return(
      <div className="home-body" id="home-body">
        <div className="project-list">
          {
            projects.map((project, i) => (
              <ProjectIndexItem 
                key={i}
                project={project} 
                deleteProject={deleteProject} 
                updateProject={updateProject}
                openModal={openModal}
              />
            ))
          }
    }
  ```

  ``` javascript
    // Each project is rendered as a component index item, styled with SVGs
    /* JQuery methods key into variable property ids to enable unique handlers
    (unique edit and delete dropdowns). */
  render() {
    const { project, creator } = this.props;
    return (
      <div id={`project-tile-${project.id}`} key={project.id} className="project-tile">
        <svg id={`ellipsis-${project.id}`} className="ellipsis" viewBox="0 0 32 32" tabIndex="0" focusable="false">
          <path d="M16,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S14.3,13,16,13z M3,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S1.3,13,3,13z M29,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S27.3,13,29,13z"></path>
        </svg>
        <div id={`project-dropdown-${project.id}`} className={`project-dropdown`}>
          <div id={`project-edit-${project.id}`} className="dropdown-item">Edit Project</div>
          <div id={`project-delete-${project.id}`} className="dropdown-item">Delete Project</div>
        </div>
        <div className="tile-card">
          <svg className="project-icon" viewBox="0 0 32 32" tabIndex="0" focusable="false">
            <path d="M 26 2 H 6 C 2.7 2 0 4.7 0 8 v 14 c 0 3.3 2.7 6 6 6 h 20 c 3.3 0 6 -2.7 6 -6 V 8 C 32 4.7 29.3 2 26 2 Z M 30 22 c 0 2.2 -1.8 4 -4 4 H 6 c -2.2 0 -4 -1.8 -4 -4 V 8 c 0 -2.2 1.8 -4 4 -4 h 20 c 2.2 0 4 1.8 4 4 V 22 Z M 26 9 c 0 0.6 -0.4 1 -1 1 H 13 c -0.6 0 -1 -0.4 -1 -1 s 0.4 -1 1 -1 h 12 C 25.6 8 26 8.4 26 9 Z M 12 15 c 0 -0.6 0.4 -1 1 -1 h 6 c 0.6 0 1 0.4 1 1 s -0.4 1 -1 1 h -6 C 12.4 16 12 15.6 12 15 Z M 24 21 c 0 0.6 -0.4 1 -1 1 H 13 c -0.6 0 -1 -0.4 -1 -1 s 0.4 -1 1 -1 h 10 C 23.6 20 24 20.4 24 21 Z M 9.2 9 c 0 0.7 -0.5 1.2 -1.2 1.2 S 6.8 9.7 6.8 9 S 7.3 7.8 8 7.8 S 9.2 8.3 9.2 9 Z M 9.2 15 c 0 0.7 -0.5 1.2 -1.2 1.2 S 6.8 15.7 6.8 15 s 0.5 -1.2 1.2 -1.2 S 9.2 14.3 9.2 15 Z M 9.2 21 c 0 0.7 -0.5 1.2 -1.2 1.2 S 6.8 21.7 6.8 21 s 0.5 -1.2 1.2 -1.2 S 9.2 20.3 9.2 21 Z"></path>
          </svg>
        </div>
        <div className="tile-name">{project.name}</div>
    }
  ```
  ![projects-index](https://user-images.githubusercontent.com/39147326/79030959-8f4cda00-7b50-11ea-8c2b-45330dba09d8.gif)

## Future Direction
* Projects Show page populates list view of Tasks.
* Project tasks Kanban Board with Drag and Drop.