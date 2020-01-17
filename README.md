# README

About:
  The Dietsana project is a built-from-scratch clone of Asana. 
  From the Asana page:
  Asana is a web and mobile application designed to help teams organize, track, and manage their work. Forrester, Inc. reports that “Asana simplifies team-based work management.”

Link to live site: 
  https://dietsana.herokuapp.com/


Discussion of technologies used:
  Backend: Ruby on Rails
  Frontend: React (Javascript)
  Notable Libraries: JQuery


Feature Highlights:
  1. Modals: 

  2. Nested event listeners:

Code snippets to highlight your best code (markdown code snippets, NOT screenshots)


DEV NOTES:

Set config.assets.compile from false to true in production.rb. 
This was a solution that fixed some of my image assets from loading on heroku app,
admittingly I do not understand this solution.

Backlog: Currently, user login and signup are NOT case insensitive! therefore, you must be 
case-sensitive when attempting to sign in. 
