class ProjectsAddIndex < ActiveRecord::Migration[5.2]
  def change
      add_index :projects, :owner_id
  end
end
