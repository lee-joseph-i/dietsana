import React from 'react';
import { Route } from 'react-router-dom';
import ProjectIndexContainer from '../projects/project_index_container';
import HeaderContainer from '../header/header-container';
import ProjectCreateFormContainer from '../projects/project_create_form_container';
import ProjectShowContainer from '../projects/project_show_container';
import ProjectEditFormContainer from '../projects/project_edit_form_container';

const Body = () => (
  <div className="body">
    <Route path="/app" component={HeaderContainer} />
    <Route exact path="/app" component={ProjectIndexContainer} />
    {/* <Route path="/app/projects/new" component={ProjectCreateFormContainer} />  */}
    {/* creating projects does not need a route, may need to just delete the commented route on line 13 */}
    <Route exact path="/app/projects/:projectId" component={SectionIndexContainer} />
    <Route path="/app/projects/:projectId/edit" component={ProjectEditFormContainer} />
  </div>
);

/*
when user goes to /app/projects/:projectId
- I need the header container to get state of the project name
- I need to simultaneously load the SectionIndexContainer

*/
//Joseph-Review

export default Body;
