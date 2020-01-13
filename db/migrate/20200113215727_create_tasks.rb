class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :body
      t.boolean :complete, null: false, default: false
      t.integer :project_id
      t.integer :assignee_id
      t.integer :section_id

      t.timestamps
    end
      add_index :tasks, :project_id
      add_index :tasks, :assignee_id
      add_index :tasks, :section_id
  end
end
