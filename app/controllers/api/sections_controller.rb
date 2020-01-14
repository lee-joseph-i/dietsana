class Api::SectionsController < ApplicationController
  def create
    @section = Section.new(section_params)

    if @section.save
      # login(@user)
      # render "api/tasks/show"
    else
      render json: ['Please include a name.'], status: 422
    end
  end

  private

  def section_params
    params.require(:section).permit(:name)
  end
end
