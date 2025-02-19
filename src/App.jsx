import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../src/pages/HomePage.jsx';
// import Header from './components/Header/Header.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/lenses" element={<LensPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/questions" element={<QuestionsPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;