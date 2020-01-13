class Project < ApplicationRecord
  validates :name, :creator_id, presence: true

  belongs_to :creator,
      foreign_key: :creator_id

  belongs_to :assignee,
      foreign_key: :assignee_id

  has_many :sections,
      foreign_key: :project_id

end
