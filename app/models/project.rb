class Project < ApplicationRecord
  validates :name, :creator_id, presence: true

end
