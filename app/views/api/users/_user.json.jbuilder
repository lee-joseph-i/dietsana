# You'll want an api/users/show.json.jbuilder, which you can use for multiple 
# controller actions. This should delegate to a 
# partial: api/users/_user.json.jbuilder, which we'll use later.

json.extract! @user, :first_name, :last_name, :id, :email