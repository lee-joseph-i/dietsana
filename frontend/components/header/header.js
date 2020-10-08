import React from 'react';
import { Link } from 'react-router-dom';
import ProfileContainer from './profile-container';
import { Redirect, Route, withRouter } from 'react-router-dom';
// import { AuthRoute, ProtectedRoute } from '../../util/route_util';

class Header extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    // if i add this line, the header won't render on home page. 
    // likely needs a component did mount, but it's not necessary with nested components handling this.
    // if(!this.props.project) return null;
    return (
      <div className="header">
        <div className="home">
          <Route exact path="/app" render={() => "Home: Projects"} />
          <Route
            path="/app/projects/:projectId"
            render={() => 
              this.props.project.name
            }
          />
        </div>
        <div>
          <ProfileContainer />
        </div>
      </div>
    );
  }
}

export default Header;

// export default ({ currentUser, openModal }) => {
//   return (
//     <div className="header">
//       <div className="home">
//         <Route exact path="/app" render={(props) => (
//           "Home - Projects"
//         )} />
//         <Route path="/app/projects/:projectId" render={(props) => (
//           console.log(props)
//         )} />
//       </div>
//       <div>
//         <ProfileContainer />
//       </div>
//     </div>
//   )
// }