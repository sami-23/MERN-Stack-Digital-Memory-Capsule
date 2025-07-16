import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Timeline from './Timeline';

export default function CapsulesDashboard({ user, setUser }) {
  const [data, setData] = useState({ own: [], received: [] });
  const [timeline, setTimeline] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    fetch('/api/capsule/my', {
      headers: { 'x-auth-token': localStorage.getItem('token') }
    })
      .then(res => res.json())
      .then(r => {
        setData(r);
        setLoading(false);
      });
    fetch('/api/capsule/timeline', {
      headers: { 'x-auth-token': localStorage.getItem('token') }
    })
      .then(res => res.json())
      .then(r => setTimeline(r));
  }, []);

  useEffect(() => {
    // Notify for capsules that have just been unlocked (simulate notification)
    const checkNotifications = () => {
      const now = new Date();
      const notifs = timeline.filter(c =>
        (c.recipients.some(rec => rec._id === user.id) || c.owner._id === user.id) &&
        !c.isOpened && new Date(c.unlockDate) <= now
      );
      if (notifs.length > 0) setNotifications(notifs);
    };
    checkNotifications();
    const interval = setInterval(checkNotifications, 60000);
    return () => clearInterval(interval);
  }, [timeline, user.id]);

  return (
    <div className="container">
      <h2>Welcome, {user.username} <button onClick={logout}>Logout</button></h2>
      <button onClick={() => navigate('/create')}>+ New Capsule</button>
      {notifications.length > 0 && <div style={{ color: 'green' }}>
        <b>🎉 You have {notifications.length} newly unlocked capsule(s)!</b>
      </div>}
      <h3>Timeline</h3>
      <Timeline capsules={timeline} userId={user.id} />
      <h3>Your Capsules</h3>
      {loading ? 'Loading...' : (
        <ul>
          {data.own.map(c => 
            <li key={c._id}>
              <strong>{c.title}</strong> (Unlocks: {new Date(c.unlockDate).toLocaleString()})
            </li>
          )}
        </ul>
      )}
      <h3>Received Capsules</h3>
      {loading ? 'Loading...' : (
        <ul>
          {data.received.map(c =>
            <li key={c._id}>
              <strong>{c.title}</strong> from {c.owner.username} (Unlocks: {new Date(c.unlockDate).toLocaleString()})
            </li>
          )}
        </ul>
      )}
    </div>
  );
}