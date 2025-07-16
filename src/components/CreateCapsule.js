import React, { useEffect, useState } from 'react';

export default function CreateCapsule({ user }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    media: [],
    recipients: [],
    unlockDate: '',
  });
  const [allUsers, setAllUsers] = useState([]);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    fetch('/api/user/recipients', {
      headers: { 'x-auth-token': localStorage.getItem('token') }
    })
      .then(res => res.json())
      .then(users => setAllUsers(users));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    });
  };

  // Handle recipient (multi select)
  const handleRecipient = (e) => {
    const val = e.target.value;
    setForm(f => ({
      ...f,
      recipients: f.recipients.includes(val)
        ? f.recipients.filter(r => r !== val)
        : f.recipients.concat(val)
    }));
  };

  // Handle image/video uploads as data URLs
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(file =>
      new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      })
    )).then(urls => {
      setForm(f => ({ ...f, media: f.media.concat(urls) }));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setErr('');
    try {
      const res = await fetch('/api/capsule/create', {
        method: 'POST',
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          unlockDate: new Date(form.unlockDate).toISOString()
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMsg('Capsule created!');
      setForm({ title: '', content: '', media: [], recipients: [], unlockDate: '' });
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="container">
      <h2>New Time Capsule</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        /><br />
        <textarea
          rows={5}
          name="content"
          placeholder="Write your memory (rich text supported in full version)..."
          value={form.content}
          onChange={handleChange}
          required
        /><br />
        <label>Add image/video(s):</label>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFiles}
        /><br />
        {form.media.length > 0 && <div>
          {form.media.map((url, i) =>
            url.startsWith('data:image') ?
              <img key={i} src={url} alt="media" width={80} style={{ margin: 3 }} />
              : <video key={i} controls src={url} width={120} style={{ margin: 3 }} />
          )}
        </div>}
        <label>Recipients (optional):</label><br />
        {allUsers.map(u =>
          <label key={u._id}>
            <input
              type="checkbox"
              value={u._id}
              checked={form.recipients.includes(u._id)}
              onChange={handleRecipient}
            />
            {u.username} ({u.email})
          </label>
        )}
        <br />
        <label>Unlock date:</label>
        <input
          name="unlockDate"
          type="datetime-local"
          value={form.unlockDate}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Create Capsule</button>
      </form>
      {msg && <div style={{ color: 'green' }}>{msg}</div>}
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <div>
        <a href="/">Back to dashboard</a>
      </div>
    </div>
  );
}