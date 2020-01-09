import React from 'react';
import { connect } from 'react-redux';
import NavBar from './nav_bar';
// import { logout } from '../../actions/session_actions'; 

const mapStateToProps = (state) => ({
  currentUser: state.session.id
});

// logout method, don't need here
// const mapDispatchToProps = (dispatch) => ({
//   logout: () => dispatch(logout())
// });

export default connect(mapStateToProps, undefined)(NavBar);