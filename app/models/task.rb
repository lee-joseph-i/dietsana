class Task < ApplicationRecord
  validates :title, :complete, presence: true

  belongs_to :section,
    foreign_key: :section_id

  belongs_to :assignee,
    foreign_key: :assignee_id

  belongs_to :creator,
    foreign_key: :creator_id

  belongs_to :project,
    foreign_key: :project_id
  
end


# a section has many tasks.
# a project has many sections (starts with one by default)
# a task belongs to a section AND a project