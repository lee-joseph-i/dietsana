class Section < ApplicationRecord
  validates :name, :project_id, presence: true
  belongs_to :project,
  has_many :tasks,

  def add_task(task_id)
    # task methods
    self.task_will_change!
    self.task.push(task_id)
    self.save
  end

  def move_task(old_idx, new_idx)
    # moving tasks from section to section
    self.task_will_change!
    self.task.insert(new_idx, self.task.delete_at(old_idx))
    self.save
  end

end
