class AddSectionsToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :section, :integer, default: [], array: true
  end
end
