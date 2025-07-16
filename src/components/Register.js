import React, { useState } from 'react';

export default function Register({ setUser }) {
  const [fields, setFields] = useState({ username: '', email: '', password: '' });
  const [err, setErr] = useState('');

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
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
      <h2>Register</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={fields.username}
          onChange={handleChange}
          required
        /><br />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={fields.email}
          onChange={handleChange}
          required
        /><br />
        <input 
          type="password"
          name="password"
          placeholder="Password"
          value={fields.password}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Register</button>
      </form>
      <div>Already have an account? <a href="/login">Login</a></div>
    </div>
  );
}