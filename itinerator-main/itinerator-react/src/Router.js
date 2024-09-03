import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Surprise from './pages/Surprise';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import RegexMatcher from './components/RegexMatcher';

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
			  <Route path="/results/:quizId" element={<Results />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/regex" element={<RegexMatcher />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;