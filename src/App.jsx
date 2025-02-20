import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../src/pages/HomePage.jsx';
import LensesPage from '../src/pages/LensesPage.jsx';
import RemindersPage from '../src/pages/RemindersPage.jsx';
import LoginPage from '../src/pages/LoginPage.jsx';
import SignUpPage from '../src/pages/SignUpPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lenses" element={<LensesPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
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