class Api::ProjectsController < ApplicationController
  def create
    @project = Project.new(project_params)
    @project.creator_id = current_user.id
    # permit owner_id but leave it blank
    # same with description
    # debugger
    if @project.save
      render 'api/projects/show'
    else
      render json: ['Please name your project.'], status: 422
    end
  end

  def index
    @projects = Project.all
    # render "api/projects/index"
  end

  def show
    @project = Project.find(params[:id])
  end

  def update
    @project = Project.find(params[:id])
    if @project.update(project_params)
      render :show
    else
      render json: ['Please name your project.'], status: 422
    end
  end

  def destroy
    @project = Project.find(params[:id])
    if @project
      @project.destroy
      render :show
    else
      render json: ['Project not found!']
    end
  end


  private

  def project_params
    params.require(:project).permit(:name, :owner_id, :description)
  end
end
