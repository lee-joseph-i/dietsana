json.extract! project, :id, :name, :description, :creator_id, :owner_id, :team_id, :section_order

json.owner do
  if project.owner
    json.extract! project.owner, :first_name, :last_name
  end
end
