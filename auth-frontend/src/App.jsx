import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import TestProtected from './components/TestProtected';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Router>
      {/* Navigation component - appears on all pages */}
      <Navigation />
      
      {/* Main content area */}
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/test" element={<TestProtected />} />
          {/* Default Route */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
