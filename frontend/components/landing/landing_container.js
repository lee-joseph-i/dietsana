import { connect } from 'react-redux';
import Landing from './landing';

const mapStateToProps = state => {
  return {
    currentUser: !!state.session.id
  };
};

export default connect(mapStateToProps, undefined)(Landing);