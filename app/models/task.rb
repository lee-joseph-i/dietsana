class Task < ApplicationRecord
  validates :title, presence: true

  belongs_to :section

  # belongs_to :section,
  #   foreign_key: :section_id,
  #   class_name: :Section

  has_one :project,
    through: :section,
    source: :project

  has_many :task_assignments,
    primary_key: :id,
    foreign_key: :task_id,
    class_name: :TaskAssignment,
    inverse_of: :task,
    dependent: :destroy

  has_many :users,
    through: :task_assignments,
    source: :user
end


# a section has many tasks.
# a project has many sections (starts with one by default)
# a task belongs to a section AND a project