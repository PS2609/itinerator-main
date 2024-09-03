// Router.js

import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './App';
import Quiz from './pages/Quiz';

const RouterComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/quiz" component={Quiz} />
      </Switch>
    </Router>
  );
};

export default RouterComponent;