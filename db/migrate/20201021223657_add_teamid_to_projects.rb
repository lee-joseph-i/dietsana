class AddTeamidToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :team_id, :integer, null: false
  end

  # add_index :projects, :team_id
  # add_index :projects, :name, unique: true
end
