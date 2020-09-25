class Section < ApplicationRecord
  validates :name, :project_id, presence: true
  validates :name, uniqueness: { scope: :project_id }

  belongs_to :project

  has_many :tasks,
    foreign_key: :section_id,
    class_name: :Task
end