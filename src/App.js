import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ClassPage from './ClassPage';
import EditGradingSystem from './EditGradingSystem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/class/:classId" element={<ClassPage />} />
      <Route path="/class/:classId/edit" element={<EditGradingSystem />} />
      </Routes>
    </Router>
  );
}

export default App;
