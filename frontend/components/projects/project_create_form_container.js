import { connect } from 'react-redux';
import React from 'react';
import { createProject } from '../../actions/project_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import ProjectCreateForm from './project_create_form';
import { clearErrors } from '../../actions/session_actions';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => dispatch(createProject(project)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreateForm);
