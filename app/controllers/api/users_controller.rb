class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      personalizedErrors = @user.errors.full_messages.map do |error|
        if error.include?("First name")
          "Please enter your first name."
        elsif error.include?("Last name")
          "Please enter your last name."
        elsif error.include?("Email has already been")
          "That email has already been taken."
        elsif error.include?("Email can't be blank")
          "Please enter your email."
        elsif error.include?("Password")
          "Please enter a password with 8 or more characters."
        end
      end
      render json: personalizedErrors, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end
end
