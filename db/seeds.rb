# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.connection.execute("TRUNCATE TABLE users, projects RESTART IDENTITY")

ApplicationRecord.transaction do 
  User.destroy_all
  Project.destroy_all

  User.create!(
    first_name: 'Joseph', 
    last_name: 'Lee', 
    email: 'josephlee@maru.com', 
    password: "password123")

  User.create!(
    first_name: 'Helen', 
    last_name: 'Yu', 
    email: 'johnlee@maru.com', 
    password: "password123")

  User.create!(
    first_name: 'Lina', 
    last_name: 'Kherchi', 
    email: 'linakherchi@maru.com', 
    password: "password123")

  User.create!(
    first_name: 'Mike', 
    last_name: 'Madsen', 
    email: 'mikemadsen@maru.com', 
    password: "password123")

  User.create!(
    first_name: 'Sam', 
    last_name: 'Walker', 
    email: 'samwalker@maru.com', 
    password: "password123")

  Project.create!(
    name: 'The Maru Project',
    owner_id: 1,
    creator_id: 1,
    description: "Hey! Welcome to my Asana inspired project management web application.\nHere, you'll have the MVPs of what Asana typically touts: projects, tasks, users and owners, and pipeline views.",
  )

  Project.create!(
    name: 'MERN Stack Project: Space Balls',
    owner_id: 2,
    creator_id: 1,
    description: "
    I've created a project using the MERN stack, a collaborative effort with three others engineers. Check it out!\n http://space-ball.herokuapp.com/#/",
  )

  Project.create!(
    name: 'Javascript Project',
    owner_id: 1,
    creator_id: 3,
    description: "
    I've created a purely frontend JS project. It's a fun typing game! Knock yourself out :)\n https://lee-joseph-i.github.io/gotta-type-em-all/",
  )

  Project.create!(
    name: 'Self Care',
    owner_id: 4,
    creator_id: 3,
    description: "In times like these, don't forget to take care of yourself. Progress on your own pace.",
  )

  Project.create!(
    name: 'Job Search: Algos and Data Structures',
    owner_id: 3,
    creator_id: 3,
    description: "Leetcode, AlgoExpert, ... more Leetcode.",
  )

  Project.create!(
    name: 'MVP: Kanban Board',
    owner_id: 3,
    creator_id: 1,
    description: "
    The Kanban Board is a pipeline view where tasks can be read along in a progressive manner. This allows users and teams to follow a sequential list of tasks and track the progress of a project completion.\n- Tasks associated with projects.\n- Sections for tasks.\n- Drag and Drop functionality.",
  )
end