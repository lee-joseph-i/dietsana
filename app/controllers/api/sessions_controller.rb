class Api::SessionsController < ApplicationController 
  def create
    @user = User.find_by_credentials(
      params[:user][:email], 
      params[:user][:password]
      )
    if @user.nil?
      render json: ['Invalid creds, please try again 【=◈︿◈=】'], status: 401
    else
      login(@user)
      render 'api/users/show';
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render "api/users/show"
    else
      render json: ["There was no user to sign out"], status: 404
    end
  end
    
end