import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../src/pages/HomePage.jsx';
import LensesPage from '../src/pages/LensesPage.jsx';
import RemindersPage from '../src/pages/RemindersPage.jsx';
import LoginPage from '../src/pages/LoginPage.jsx';
import SignUpPage from '../src/pages/SignUpPage.jsx';
import QuestionsPage from '../src/pages/QuestionsPage.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lenses" element={<LensesPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/users/signup" element={<SignUpPage />} />
        <Route path="/ask-gemini" element={<QuestionsPage />} />


      </Routes>
    </Router>
  );
}

export default App;