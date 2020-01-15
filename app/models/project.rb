class Project < ApplicationRecord
  validates :name, :creator_id, presence: true

  belongs_to :creator,
      foreign_key: :creator_id,
      class_name: :User

  belongs_to :owner,
      foreign_key: :owner_id,
      class_name: :User,
      optional: true

  has_many :sections,
      foreign_key: :project_id,
      class_name: :Section

end
