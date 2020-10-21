class Project < ApplicationRecord
  validates :name, :team_id, :creator_id, presence: true
  validates :name, presence: true, uniqueness: true

  belongs_to :creator,
      foreign_key: :creator_id,
      class_name: :User

  belongs_to :owner,
      foreign_key: :owner_id,
      class_name: :User,
      optional: true

  belongs_to :team,
    primary_key: :id,
    foreign_key: :team_id,
    class_name: :Team

  has_many :sections,
      foreign_key: :project_id,
      class_name: :Section

  has_many :tasks,
    through: :sections,
    source: :tasks

  has_many :project_memberships,
    primary_key: :id,
    foreign_key: :project_id,
    class_name: :ProjectMembership,
    inverse_of: :project,
    dependent: :destroy

  has_many :members,
    through: :project_memberships,
    source: :member
    # inverse_of: :projects
end
