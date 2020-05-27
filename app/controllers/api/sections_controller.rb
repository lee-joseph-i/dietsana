class Api::SectionsController < ApplicationController

  def index
    @sections = Project.find_by(id: params[:project_id]).sections
  end

  def create
    @section = Section.new(section_params)

    if @section.save
      # login(@user)
      render :show
    else
      # render json: ['Please include a name.'], status: 422
      render json: @section.errors.full_messages, status: 401
    end
  end

  def show #necessary?
    @section = Section.find_by(id: params[:id])
  end

  def update
    @section = Section.find_by(id: params[:id])
    @section.task_will_change!
    @section.update_attributes(section_params)
    @section.task = [] unless section_params[:task]
    @section.save!
    render :update
  end

  def destroy
    @section = Section.find_by(id: params[:id])
    @section.destroy
  end

  private

  def section_params
    params.require(:section).permit(:name)
  end
end
