export const fetchProjects = () => (
  $.ajax({
    method: 'GET',
    url: '/api/projects',
  })
);

export const fetchProject = projectId => (
  $.ajax({
    method: 'GET',
    url: `/api/projects/${projectId}`
  })
);

export const createProject = project => (
  $.ajax({
    method: 'POST',
    url: '/api/projects',
    data: { project }
  })
);

export const updateProject = project => {
  return $.ajax({
    method: 'PATCH',
    url: `api/projects/${project.id}`,
    data: { project }
  })
};

// export const deleteProject = projectId => (
//   $.ajax({
//     method: 'DELETE',
//     url: `/api/projects/${projectId}`
//   })
// );

export const deleteProject = projectId => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/projects/${projectId}`
  })
};