// Router.js

import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './/Home';
import Quiz from './components/Quiz';

const RouterComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/quiz" component={Quiz} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default RouterComponent;