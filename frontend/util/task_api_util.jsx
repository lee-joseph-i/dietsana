export const fetchTasks = sectionId => (
  $.ajax({
    method: 'GET',
    url: '/api/tasks',
    data: { sectionId }
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

export const updateSection = section => {
  return $.ajax({
    method: 'PATCH',
    url: `api/tasks/${task.id}`,
    data: { section }
  })
};

export const deleteSection = taskId => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/tasks/${taskId}`
  })
};