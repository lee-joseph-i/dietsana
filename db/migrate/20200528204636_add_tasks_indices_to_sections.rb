class AddTasksIndicesToSections < ActiveRecord::Migration[5.2]
  def change
      add_column :sections, :task, :integer, default: [], array: true
  end
end
