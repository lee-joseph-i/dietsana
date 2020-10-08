import React from 'react';
import { Link } from 'react-router-dom';
import ProfileContainer from './profile-container';
import { Redirect, Route, withRouter } from 'react-router-dom';
// import { AuthRoute, ProtectedRoute } from '../../util/route_util';

// class Header extends React.Component{
//   constructor(props){
//     super(props)
//   }

//   render(){
//     if(!this.props.project){
//       return (
//         <div className="header">
//           <div className="home">
//             <Route exact path="/app" render={() => "Home: Projects"} />
//             {/* <Route
//               path="/app/projects/:projectId"
//               render={() => this.props.project.name}
//             /> */}
//           </div>
//           <div>
//             <ProfileContainer />
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="header">
//           <div className="home">
//             <Route exact path="/app" render={() => "Home: Projects"} />
//             <Route
//               path="/app/projects/:projectId"
//               render={() => 
//                 this.props.project.name
//               }
//             />
//           </div>
//           <div>
//             <ProfileContainer />
//           </div>
//         </div>
//       );
//     }
//   }
// }

// export default Header;

// some practice with functional components when state isn't required - the above code works perfectly fine as well.
export default ({ project }) => {
  if(!project){
    return (
        <div className="header">
          <div className="home">
            <Route exact path="/app" render={() => "Home: Projects"} />
            {/* <Route
              path="/app/projects/:projectId"
              render={() => this.props.project.name}
            /> */}
          </div>
          <div>
            <ProfileContainer />
          </div>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div className="home">
            <Route exact path="/app" render={() => "Home: Projects"} />
            <Route
              path="/app/projects/:projectId"
              render={() => 
                project.name
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