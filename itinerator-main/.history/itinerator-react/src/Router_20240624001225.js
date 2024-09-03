// Router.js

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Quiz from './pages/Quiz';

const RouterComponent = () => {
  return (
	  <Router>
		  <Route path="/" exact component={Home} />
	  <Route path="/quiz" component={Quiz} />
	</Router>
  );
};

export default RouterComponent;