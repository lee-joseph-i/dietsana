class Api::TasksController < ApplicationController
  
  def index
    p "TASK CONTROLLER"
    p params[:sectionId]
    @tasks = Section.find_by(id: params[:sectionId]).tasks
    p @tasks
    render :index
  end
  
  def create
    @task = Task.new(task_params)
    @task.creator_id = current_user.id
    if @task.save
      render :show
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def show
    @task = Task.find(params[:id])
    render :show
  end

  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      render :show
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    render json: @task
  end

  private

  def task_params
    params.require(:task).permit(:title, :due_date, :complete, :section_id, :description, user_ids: [])
  end
end
