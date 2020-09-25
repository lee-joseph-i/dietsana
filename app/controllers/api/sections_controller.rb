class Api::SectionsController < ApplicationController

  # def index
  #   @sections = Project.find_by(id: params[:project_id]).sections
  # end

  def index
    p "SECTION CONTROLER INDEX"
    @sections = current_user.project_sections
    render :index
  end

  def create
    @section = Section.new(section_params)

    if @section.save
      # login(@user)
      render :show
    else
      # render json: ['Please include a name.'], status: 422
      render json: @section.errors.full_messages, status: 422
    end
  end

  def show
    @section = Section.find(params[:id])
    render :show
  end

  def update
    @section = Section.find(params[:id])
    # p section_params
    if @section.update(section_params)
      @section.task_order = [] unless section_params[:task_order]
      if @section.save!
        render :show
      else
        render json: @section.errors.full_messages, status: 422
      end
    else
      render json: @section.errors.full_messages, status: 422
    end
  end

  def destroy
    @section = Section.find_by(id: params[:id])
    @section.destroy
  end

  private

  def section_params
    params.require(:section).permit(:project_id, :name, task_order: [])
  end
end
