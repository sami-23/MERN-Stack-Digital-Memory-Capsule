import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CapsulesDashboard from './components/CapsulesDashboard';
import CreateCapsule from './components/CreateCapsule';

function App() {
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('user');
    return t && u ? JSON.parse(u) : null;
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <CapsulesDashboard user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/create" element={user ? <CreateCapsule user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;