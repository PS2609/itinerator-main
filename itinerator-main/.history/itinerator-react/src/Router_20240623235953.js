// Router.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
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