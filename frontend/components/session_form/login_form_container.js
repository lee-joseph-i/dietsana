import { connect } from 'react-redux';
import React from 'react';
import { login } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import LoginForm from './login_form';
import {clearErrors} from '../../actions/session_actions';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'login',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    otherForm: (
      <p className="linkify" onClick={() => dispatch(openModal('signup'))}>Sign Up</p>
    ),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
