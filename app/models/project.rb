class Project < ApplicationRecord
  validates :name, :creator_id, presence: true

  belongs_to :creator,
      foreign_key: :creator_id,
      class_name: :User

  belongs_to :owner,
      foreign_key: :owner_id,
      class_name: :User,
      optional: true

  has_many :sections,
      foreign_key: :project_id,
      class_name: :Section

  has_many :tasks,
      through: :sections

  def add_section(section_id)
    self.section_will_change!
    self.section.push(section_id)
    self.save
  end

  def move_section(old_idx, new_idx)
    self.section_will_change!
    self.section.insert(new_idx, self.section.delete_at(old_idx))
    self.save
  end
end
