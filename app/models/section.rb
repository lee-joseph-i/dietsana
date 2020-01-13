class Section < ApplicationRecord
  validates :name, :project_id, presence: true

  belongs_to :project,
    foreign_key: :project_id

  has_many :tasks,
    foreign_key: :section_id

end
