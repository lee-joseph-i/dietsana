class ChangeColumnNameInSectionsFromTaskToTaskOrder < ActiveRecord::Migration[5.2]
  def change
    rename_column :sections, :task, :task_order
  end
end
