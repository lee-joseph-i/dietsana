class AddTaskCreatorIndex < ActiveRecord::Migration[5.2]
  def change
  end
  add_index :tasks, :creator_id
end
