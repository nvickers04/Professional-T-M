import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp'; // Import SignUp
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> {/* Add SignUp route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<SignIn />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;