class ProjectMembership < ApplicationRecord
  validates :member_id, uniqueness: { scope: :project_id }

  belongs_to :member,
    foreign_key: :member_id,
    class_name: :User
    
  belongs_to :project,
    foreign_key: :project_id,
    class_name: :Project
end
