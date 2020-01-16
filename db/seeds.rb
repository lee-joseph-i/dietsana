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
    first_name: 'John', 
    last_name: 'Lee', 
    email: 'johnlee@dietsana.com', 
    password: "password123")

  User.create!(
    first_name: 'Chris', 
    last_name: 'Lee', 
    email: 'chrislee@dietsana.com', 
    password: "password123")

  Project.create!(
    name: 'Full Stack Project',
    owner_id: 1,
    creator_id: 1,
    description: 'Build your first (but not last) FS project - from scratch!',
  )

  Project.create!(
    name: 'Flex Project',
    owner_id: 1,
    creator_id: 2,
    description: 'Build a project using the MERN stack with a team.',
  )

  Project.create!(
    name: 'Javascript Project',
    owner_id: 1,
    creator_id: 3,
    description: 'Build your own game using JS! pew pew~',
  )

end