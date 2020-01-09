import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Landing from './landing/landing';
import Main from './main/main_container';
import NavBarContainer from './nav_bar/nav_bar_container';
import Footer from './nav_bar/footer';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';

const App = () => (
  <div>
      <AuthRoute path="/login" component={LoginContainer} />
      <AuthRoute path="/signup" component={SignupContainer} />
      <Route exact path="/" component={NavBarContainer} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/" component={Footer} />
      <Route path="/app" component={Main} />
  </div>
);

export default App;