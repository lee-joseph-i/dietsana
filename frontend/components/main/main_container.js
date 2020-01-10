import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Main from './main';

const mapStateToProps = ({ session, entities: { users } }) => {
  debugger;
  return {
    currentUser: users[session.id]
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);