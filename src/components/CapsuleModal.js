import React, { useState } from 'react';

export default function CapsuleModal({ capsule, onClose, onOpen, userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const canOpen = new Date(capsule.unlockDate) <= new Date();

  const openCapsule = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/capsule/open/' + capsule._id, {
        method: 'POST',
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      const d = await res.json();
      setData(d);
    } catch (e) { /* ignore */ }
    setLoading(false);
  };

  if (!canOpen) return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} style={{ float: 'right' }}>X</button>
        <h3>{capsule.title}</h3>
        <p>Capsule locked until {new Date(capsule.unlockDate).toLocaleString()}</p>
      </div>
    </div>
  );

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} style={{ float: 'right' }}>X</button>
        <h3>{capsule.title}</h3>
        {!data ? (
          <div>
            <button onClick={openCapsule} disabled={loading}>
              {loading ? 'Opening...' : 'Open Capsule'}
            </button>
          </div>
        ) : (
          <div>
            <div dangerouslySetInnerHTML={{ __html: data.content || '' }} />
            {data.media && data.media.length > 0 && <div>
              {data.media.map((url, i) =>
                url.startsWith('data:image') ?
                  <img key={i} src={url} alt="media" width={120} style={{ margin: 3 }} />
                  : <video key={i} controls src={url} width={170} style={{ margin: 3 }} />
              )}
            </div>}
            <div style={{ color: 'gray' }}>Opened at: {data.openedAt && new Date(data.openedAt).toLocaleString()}</div>
          </div>
        )}
      </div>
    </div>
  );
}