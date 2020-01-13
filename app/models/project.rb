class Project < ApplicationRecord
  validates :name, :creator_id, presence: true


  belongs_to :creator,
      foreign_key: :creator_id

      
end
