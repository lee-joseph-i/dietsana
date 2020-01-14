import React from 'react';
import { Link, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import ProjectIndexContainer from '../projects/project_index_container'


const Body = () => (
  <div className="body">
    <ProtectedRoute path="/app" component={ProjectIndexContainer} />
  </div>
);

export default Body;

