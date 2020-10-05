import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { openModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.id,
    project: state.entities.projects[
      ownProps.location.pathname.toString().split("/app/projects/")[1]
    ],
  };
};

const mapDispatchToProps = dispatch => ({
  openModal: modal => {
    dispatch(openModal(modal));
    window.scrollTo(0, 0)
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);