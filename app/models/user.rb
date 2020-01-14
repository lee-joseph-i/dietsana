class User < ApplicationRecord
  validates :first_name, :last_name, :email, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 8 }, allow_nil: true

  has_many :created_projects, 
    foreign_key: :creator_id

  has_many :assigned_projects,
    foreign_key: :assignee_id

  has_many :created_tasks,
    foreign_key: :creator_id

  has_many :assigned_tasks,
    foreign_key: :assignee_id

  attr_reader :password
  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    generate_session_token
    save!
    self.session_token
  end

  # practice 'private' good practices!
  private 

  def ensure_session_token
    generate_session_token unless self.session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def generate_session_token
    self.session_token = new_session_token
    # in the unlikely powerball-winning-chance that the generated session token is the same as before...
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
    self.session_token
  end

end
