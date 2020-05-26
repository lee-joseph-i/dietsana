class Task < ApplicationRecord
  validates :title, :complete, presence: true

  belongs_to :section,
    foreign_key: :section_id

  belongs_to :assignee,
    foreign_key: :assignee_id

  belongs_to :creator,
    foreign_key: :creator_id
  
end


# does a project have many tasks AND sections?
# or
# does a section have many tasks?
# sections can be named... 
# tasks can be "assigned" to a section...
# need to take another look at my schema