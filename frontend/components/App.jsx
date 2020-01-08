import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import Landing from './landing';
import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';


const App = () => (
  <div>
    <header>
      <Route exact path="/" component={GreetingContainer} />
    </header>
  </div>
);

export default App;
