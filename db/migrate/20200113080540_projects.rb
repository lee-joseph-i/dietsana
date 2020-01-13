class Projects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.integer :team_id
      t.integer :creator_id, null: false
      
      t.timestamps
    end

    add_index :projects, :creator_id
    add_index :projects, :team_id
  end
end
