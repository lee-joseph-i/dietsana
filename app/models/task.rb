class Task < ApplicationRecord
  validates :title, :complete, presence: true

  belongs_to :section,
    foreign_key: :section_id

  belongs_to :project,
    foreign_key: :project_id
end
