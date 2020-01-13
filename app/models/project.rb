class Project < ApplicationRecord
  validates :name :last_name, :email, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true

end
