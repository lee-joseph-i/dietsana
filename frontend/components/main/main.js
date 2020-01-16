import React from 'react';
import { Route } from 'react-router-dom';
import SidebarContainer from '../sidebar/sidebar_container';
import Body from '../body/body';

const Main = () => (
  <div className="app">
    <Route path="/app" component={SidebarContainer} />
    <Route path="/app" component={Body} />
  </div>
);

export default Main;