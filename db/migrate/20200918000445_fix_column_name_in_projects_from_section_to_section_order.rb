class FixColumnNameInProjectsFromSectionToSectionOrder < ActiveRecord::Migration[5.2]
  def change
    rename_column :projects, :section, :section_order
  end
end
