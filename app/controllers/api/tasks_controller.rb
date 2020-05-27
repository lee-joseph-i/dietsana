class Api::TasksController < ApplicationController
  
  def index
    # established that tasks cannot exist without a section... may need to check my model/db validations
    @tasks = Section.find_by(id: params[:section_id]).project.tasks
  end
  
  def create
    @task = Task.new(task_params)
    @task.section_id = @task.section_id
    @task.creator_id = current_user.id

    if @task.save
      # login(@user)
      # render "api/tasks/show"
      render :show
    else
      # render json: ['Please include a title.'], status: 422
      render json: @task.errors.full_messages, status: 401
    end
  end

  def show
    @task = Task.find_by(id: params[:id])
  end

  def update
    @task = Task.find_by(id: params[:id])
    @task.subtask_will_change!
    @task.update_attributes(task_params)
    render :update
  end

  def destroy
    @task = Task.find_by(id: params[:id])
    @task.destroy
  end

  private

  def task_params
    params.require(:task).permit(:title, :body, :due_date)
  end
end
