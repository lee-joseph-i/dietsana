export const fetchSections = projectId => (
  $.ajax({
    method: 'GET',
    url: '/api/sections',
    data: { projectId: projectId }
  })
);

export const fetchSection = sectionId => (
  $.ajax({
    method: 'GET',
    url: `/api/sections/${sectionId}`
  })
);

export const createSection = section => (
  $.ajax({
    method: 'POST',
    url: '/api/sections',
    data: { section }
  })
);

export const updateSection = section => {
  return $.ajax({
    method: 'PATCH',
    url: `api/sections/${section.id}`,
    data: { section }
  })
};

export const deleteSection = sectionId => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/sections/${sectionId}`
  })
};