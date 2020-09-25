class TaskAssignment < ApplicationRecord
  validates :task_id, uniqueness: { scope: :user_id }

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User,
    inverse_of: :task_assignments
  
  belongs_to :task,
    foreign_key: :task_id,
    class_name: :Task,
    inverse_of: :task_assignments
end
