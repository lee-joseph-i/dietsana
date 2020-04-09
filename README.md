# Dietsana
[Dietsana live link!](https://dietsana.herokuapp.com/)</br>
![Dietsana landing page](https://i.ibb.co/pZvVwJY/dietsana-screenshot.png)

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Features](#features)
4. [Future Direction](#future-direction)

## Introduction

The Dietsana project is a built-from-scratch clone of Asana. Asana is a web and mobile application designed to help teams organize, track, and manage their work. Users will be able to sign up and log in, create, edit and delete their own projects, view an index of all projects across users, and view details of individual projects.

## Technologies

**Backend** <br/> 
Dietsana uses PostgreSQL, Ruby on Rails, Node.js as the foundation to its backend.  User accounts and projects are stored in the Postgres database. User authentication is secured through standard OAuth hash and salt process.

**Frontend** <br/> 
Dietsana's frontend pages are rendered with React/Redux. Slices of state are curated for use across all React components, including the navbars, user profile modals, and individual projects.


## Features
* Landing Page - Rendition of Asana's own landing page. CSS and HTML rules applied to load and switch between showcase videos 

* User Accounts - Sign up and login modals with their backend validations. Demo login account available for browsing the app. 
``` ruby
  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
```
<img width="1000" alt="Sign Up modal" src="https://user-images.githubusercontent.com/39147326/78844328-4a8f3a80-79ba-11ea-9828-0f410daea9fa.png">
<br/> 

## Future Direction
* Dropdown search implementation on a project's Owner field.
* Projects can have tasks.
* Project tasks Kanban Board.

