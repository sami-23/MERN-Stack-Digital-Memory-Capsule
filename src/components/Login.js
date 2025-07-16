import React, { useState } from 'react';

export default function Login({ setUser }) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username/Email"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          required
        /><br />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
      <div>Don't have an account? <a href="/register">Register</a></div>
    </div>
  );
}