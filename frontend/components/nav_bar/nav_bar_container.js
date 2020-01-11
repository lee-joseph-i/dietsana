import React from 'react';
import { connect } from 'react-redux';
import NavBar from './nav_bar';
import { openModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => ({
  currentUser: state.session.id
});

const mapDispatchToProps = dispatch => ({
  openModal: modal => {
    dispatch(openModal(modal));
    window.scrollTo(0, 0)
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);