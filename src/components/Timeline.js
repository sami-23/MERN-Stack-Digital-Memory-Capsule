import React, { useState } from 'react';
import CapsuleModal from './CapsuleModal';

function CapsulePoint({ capsule, onOpen, userId }) {
  const isUnlockable = new Date(capsule.unlockDate) <= new Date();
  const [open, setOpen] = useState(false);
  return (
    <>
    <div
      style={{
        display: 'inline-block',
        margin: 10,
        textAlign: 'center',
        cursor: isUnlockable ? 'pointer' : 'default',
        opacity: isUnlockable ? 1 : 0.5
      }}
      onClick={() => isUnlockable && setOpen(true)}
      title={capsule.title}
    >
      <div style={{ fontSize: 24 }}>{capsule.isOpened ? '📬' : isUnlockable ? '🕰️' : '🔒'}</div>
      <div>{new Date(capsule.unlockDate).toLocaleDateString()}</div>
    </div>
    {open &&
      <CapsuleModal
        capsule={capsule}
        onClose={() => setOpen(false)}
        onOpen={onOpen}
        userId={userId}
      />}
    </>
  );
}

export default function Timeline({ capsules, userId }) {
  // Sort capsules by unlockDate
  const sorted = [...capsules].sort((a, b) => new Date(a.unlockDate) - new Date(b.unlockDate));
  return (
    <div style={{
      padding: 20,
      border: '1px solid #eee',
      borderRadius: 8,
      marginBottom: 40,
      background: '#fafbfc'
    }}>
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        {sorted.map(capsule =>
          <CapsulePoint
            key={capsule._id}
            capsule={capsule}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
}