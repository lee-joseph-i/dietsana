class UpdateProjects < ActiveRecord::Migration[5.2]
  def change
    remove_column :projects, :team_id
    remove_column :projects, :description
    
    add_column :projects, :owner_id, :integer
    add_column :projects, :description, :text
  end

end
