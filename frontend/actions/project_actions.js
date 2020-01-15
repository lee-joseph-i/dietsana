import * as APIUtil from '../util/project_api_util';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const RECEIVE_PROJECT_ERRORS = 'RECEIVE_PROJECT_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';

export const receiveProjects = projects => {
  return {
    type: RECEIVE_PROJECTS,
    projects
  }
};

const receiveProject = project => ({
  type: RECEIVE_PROJECT,
  project
});

const receiveErrors = errors => ({
  type: RECEIVE_PROJECT_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

const removeProject = projectId => ({
  type: REMOVE_PROJECT,
  projectId
});

export const requestProjects = () => dispatch => (
  APIUtil.fetchProjects()
    .then( projects => dispatch(receiveProjects(projects)))
);

export const requestProject = projectId => dispatch => (
  APIUtil.fetchProjects(projectId)
    .then( project => dispatch(receiveProject(project)))
);

export const createProject = project => dispatch => (
  APIUtil.createProject(project)
    .then( 
      createdProject => dispatch(receiveProject(createdProject)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    )
);

export const updateProject = project => dispatch => (
  APIUtil.updateProject(project)
    .then(
      updatedProject => dispatch(receiveProject(updatedProject)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    )
);

export const deleteProject = projectId => dispatch => (
  APIUtil.deleteProject(projectId)
    .then( deletedProject => dispatch(removeProject(deletedProject.id)))
);