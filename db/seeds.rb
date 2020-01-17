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
    email: 'josephlee@dietsana.com', 
    password: "password123")

  User.create!(
    first_name: 'Helen', 
    last_name: 'Yu', 
    email: 'johnlee@dietsana.com', 
    password: "password123")

  User.create!(
    first_name: 'Lina', 
    last_name: 'Kherchi', 
    email: 'linakherchi@dietsana.com', 
    password: "password123")

  User.create!(
    first_name: 'Mike', 
    last_name: 'Madsen', 
    email: 'mikemadsen@dietsana.com', 
    password: "password123")

  User.create!(
    first_name: 'Sam', 
    last_name: 'Walker', 
    email: 'samwalker@dietsana.com', 
    password: "password123")

  Project.create!(
    name: 'Full Stack Project',
    owner_id: 1,
    creator_id: 1,
    description: 'Build your first (but not last) FS project - from scratch!',
  )

  Project.create!(
    name: 'Flex Project',
    owner_id: 2,
    creator_id: 1,
    description: 'Build a project using the MERN stack with a team.',
  )

  Project.create!(
    name: 'Javascript Project',
    owner_id: 1,
    creator_id: 3,
    description: 'Build your own game using JS! pew pew~',
  )

  Project.create!(
    name: 'Graduation',
    owner_id: 4,
    creator_id: 3,
    description: 'You graduated! Now what?',
  )

  Project.create!(
    name: 'Job Search Curriculum',
    owner_id: 3,
    creator_id: 3,
    description: "Keep applying until you find a job or until you're dead.",
  )

  Project.create!(
    name: 'MERN Part II',
    owner_id: 3,
    creator_id: 1,
    description: 'Continue working on your MERN project with your buds.',
  )
  
  Project.create!(
    name: 'FullStack Project, Part II',
    owner_id: 5,
    creator_id: 3,
    description: 'Continue working on your FullStack after your buds have abandoned you.',
  )

  Project.create!(
    name: 'Self Care',
    owner_id: 4,
    creator_id: 3,
    description: "Don't forget to take care of yourself",
  )

  Project.create!(
    name: 'Algorithms',
    owner_id: 1,
    creator_id: 3,
    description: "Work on your algorithms.",
  )

end