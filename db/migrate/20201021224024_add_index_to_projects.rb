class AddIndexToProjects < ActiveRecord::Migration[5.2]
  def change
    add_index :projects, :team_id
    add_index :projects, :name, unique: true
  end
end
