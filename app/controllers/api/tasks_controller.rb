class Api::TasksController < ApplicationController
    def create
    @task = Task.new(task_params)

    if @task.save
      # login(@user)
      # render "api/tasks/show"
    else
      render json: ['Please include a title.'], status: 422
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :body, :due_date)
  end
end
