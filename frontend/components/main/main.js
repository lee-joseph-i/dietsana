import React from 'react';
import { Link, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import SidebarContainer from '../sidebar/sidebar_container';
import Body from '../body/body';

const Main = () => (
  <div className="app">
    <ProtectedRoute path="/app" component={SidebarContainer} />
    <ProtectedRoute path="/app" component={Body} />
  </div>
);

export default Main;