import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LandingContainer from './landing/landing_container';
import Main from './main/main_container';
import NavBarContainer from './nav_bar/nav_bar_container';
import Footer from './nav_bar/footer';
import Modal from './modal/modal';
import ProjectHomeContainer from './projects/project_home_container';

const App = () => (
  <div>
      <Modal />
      <Route exact path="/" component={NavBarContainer} />
      <Route exact path="/" component={LandingContainer} />
      <Route exact path="/" component={Footer} />
      <div className="homepage">
        <ProtectedRoute path="/app" component={Main} />
        <ProtectedRoute path="/app" component={ProjectHomeContainer} />
      </div>

  </div>
);

export default App;