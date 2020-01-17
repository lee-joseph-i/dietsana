json.extract! project, :id, :name, :description, :creator_id, :owner_id

  json.owner do
     json.extract! project.creator, :first_name, :last_name
    end