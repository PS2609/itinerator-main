// Router.js

import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Itinerator from './App';
import Quiz from './pages/';

const RouterComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Itinerator} />
        <Route path="/quiz" component={Quiz} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default RouterComponent;