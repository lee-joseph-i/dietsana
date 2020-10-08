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
  ProjectMembership.destroy_all
  Section.destroy_all
  Task.destroy_all

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
    # section_order: [Section.third.id, Section.second.id, Section.first.id],
    description: "Hey! Welcome to my Asana inspired project management web application.\nHere, you'll have some of the MVPs of what Asana typically presents: projects, tasks, users and owners, and pipeline views.\nHovering over a project will present you a dropdown option to edit or delete the project - clicking on the tile will take you to the project details page.",
  )

  Project.create!(
    name: 'MERN Stack Project: Space Balls',
    owner_id: 2,
    creator_id: 1,
    description: "I've created a project using the MERN stack, a collaborative effort with three others engineers. Check it out!\n http://space-ball.herokuapp.com/#/",
  )

  Project.create!(
    name: 'Javascript Project',
    owner_id: 1,
    creator_id: 3,
    description: "I've created a purely frontend JS project. It's a fun typing game! Knock yourself out :)\n https://lee-joseph-i.github.io/gotta-type-em-all/",
  )

  Project.create!(
    name: 'Self Care',
    owner_id: 4,
    creator_id: 3,
    description: "In times like these, don't forget to take care of yourself. Find your ideal work and life balance.",
  )

  Project.create!(
    name: 'Study: Algos and Data Structures',
    owner_id: 3,
    creator_id: 3,
    description: "Leetcode, Leetcode, Leetcode!",
  )

  Project.create!(
    name: 'MVP: Kanban Board',
    owner_id: 3,
    creator_id: 1,
    description: "
    The Kanban Board is a pipeline view where tasks can be read along in a progressive manner. This allows users and teams to follow a sequential list of tasks and track the progress of a project completion.
    \n- Tasks associated with projects.\n- Sections for tasks.\n- Drag and Drop functionality.",
  )

  ProjectMembership.create!(
    member_id: 1,
    project_id: 1
  )

  ProjectMembership.create!(
    member_id: 1,
    project_id: 2
  )

  ProjectMembership.create!(
    member_id: 1,
    project_id: 3
  )

  Section.create!(
    project_id: 1, 
    name: 'Backlog'
  )
  
  Section.create!(
    project_id: 1, 
    name: 'In Progress',
  )
  
  Section.create!(
    project_id: 1, 
    name: 'Done',
  )

  Task.create!(
    title: 'Your very first Task!', 
    creator_id: 1,
    complete: false,
    section_id: Section.first.id
  )

  Task.create!(
    title: '[BUG] Splice type error when attemptin gto re-order sections.', 
    creator_id: 1,
    complete: false,
    section_id: Section.first.id
  )

  Task.create!(
    title: '[EPIC] Projects show page - kanban board', 
    creator_id: 1,
    complete: false,
    section_id: Section.first.id
  )

  Task.create!(
    title: '[EPIC] Projects Tile Index Page', 
    creator_id: 1,
    complete: false,
    section_id: Section.first.id
  )

  Task.create!(
    title: '[EPIC] User Auth', 
    creator_id: 1,
    complete: false,
    section_id: Section.first.id
  )

  Task.create!(
    title: '[User Story] When I first enter the website, I should be greeted with ah friendly, informative landing page.', 
    creator_id: 1,
    complete: false,
    section_id: Section.first.id
  )

  Task.create!(
    title: '[REFACTOR] Performance check: redundant component rendering causing slowness on project show page.', 
    creator_id: 1,
    complete: false,
    section_id: Section.first.id
  )

  Task.create!(
    title: '[User Story] When I log in, I should be able to navigate through the projects index along the sidebar.', 
    creator_id: 1,
    complete: false,
    section_id: Section.first.id
  )

  Task.create!(
    title: '[BUG] Tasks are not rendering when dragged into another section.', 
    creator_id: 1,
    complete: false,
    section_id: Section.first.id
  )

  Project.first.update_attributes(
    section_order: [Section.first.id, Section.second.id, Section.third.id]
  )

  Section.second.update_attributes(
    task_order: []
    Task.each do |task| 
      task_order.push(task.id)
    end
  )

end