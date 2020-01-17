import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginFormContainer from '../session_form/login_form_container';
import SignupFormContainer from '../session_form/signup_form_container';
import ProjectCreateFormContainer from '../projects/project_create_form_container';
import ProjectEditFormContainer from '../projects/project_edit_form_container';

function Modal({ modal, closeModal, currentProject }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'login':
      component = <LoginFormContainer />;
      return (
        <div className="modal-background" onClick={closeModal}>
          <div className="modal-child" onClick={e => e.stopPropagation()}>
            {component}
          </div>
        </div>
      );
    case 'signup':
      component = <SignupFormContainer />;
      return (
        <div className="modal-background" onClick={closeModal}>
          <div className="modal-child" onClick={e => e.stopPropagation()}>
            {component}
          </div>
        </div>
      );
    case 'createProject':
      component = <ProjectCreateFormContainer />;
      break;
    case 'editProject':
      component = <ProjectEditFormContainer currentProject={currentProject} />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background-project" onClick={closeModal}>
      <div className="modal-child-project" onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal,
    currentProject: state.entities.projects[state.ui.projectId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
