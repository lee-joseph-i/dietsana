import React from 'react';
import { Link, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import ProjectHomeContainer from '../projects/project_home_container'


const Body = () => (
  <div className="body">
    <ProtectedRoute path="/app" component={ProjectHomeContainer} />
  </div>
);

export default Body;

