class UpdateTasks < ActiveRecord::Migration[5.2]
  def change
  end
    add_index :tasks, :due_date
end
