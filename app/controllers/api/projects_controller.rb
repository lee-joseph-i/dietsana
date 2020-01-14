class Api::ProjectsController < ApplicationController
  def create
    @project = Project.new(project_params)

    if @project.save
      # login(@user)
      # render "api/tasks/show"
    else
      render json: ['Please name  your project.'], status: 422
    end
  end

  private

  def project_params
    params.require(:project).permit(:name, :owner)
  end
end
