export const fetchTasks = sectionId => (
  $.ajax({
    method: 'GET',
    url: '/api/tasks',
    data: { sectionId: sectionId }
  })
);

export const fetchTask = taskId => (
  $.ajax({
    method: 'GET',
    url: `/api/tasks/${taskId}`
  })
);

export const createTask = task => (
  $.ajax({
    method: 'POST',
    url: '/api/tasks',
    data: { task }
  })
);

export const updateTask = task => {
  return $.ajax({
    method: 'PATCH',
    url: `api/tasks/${task.id}`,
    data: { task }
  })
};

export const deleteTask = taskId => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/tasks/${taskId}`
  })
};