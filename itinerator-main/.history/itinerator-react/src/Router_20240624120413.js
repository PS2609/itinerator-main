import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Surprise from './pages/Surprise';

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
			  <Route path="/results/:quizId" element={<Results />} />
			<Route path="/surprise" element={<Surprise />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;