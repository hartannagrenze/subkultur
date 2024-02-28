import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Survey from './survey';
import SurveyResults from './surveyResults';
import React from 'react';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Survey />} />
        <Route path="/results" element={<SurveyResults />} />
      </Routes>
    </Router>
  );
}
