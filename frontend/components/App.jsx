import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import Landing from './landing/landing';
import Main from './main/main_container';


const App = () => (
  <div>
    <header>
      <Route exact path="/" component={Landing} />
      <Route path="/app/" component={Main} /> 
      {/* Main is where the actual app will go. */}
    </header>
  </div>
);

export default App;
