// src/pages/Staff/Attendance.jsx
import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { participants } from '../../mockData';

const Attendance = () => {
  const [participantId, setParticipantId] = useState('');
  const [localParticipants, setLocalParticipants] = useState(participants);

  const handleCheckIn = () => {
    setLocalParticipants(prev => prev.map(p => p.id === parseInt(participantId) ? { ...p, checkedIn: true } : p));
    console.log('Checked in participant:', participantId);
    setParticipantId('');
  };

  return (
    <MainLayout role="staff">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Attendance</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <input
            type="text"
            placeholder="Participant ID (or QR scan)"
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
            className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleCheckIn} className="bg-green-500 text-white p-3 w-full rounded hover:bg-green-600 transition">
            Check In
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Participants</h2>
        <ul className="space-y-2">
          {localParticipants.map(p => (
            <li key={p.id} className="bg-white p-4 rounded-lg shadow-md">
              {p.name} - Checked In: {p.checkedIn ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
};

export default Attendance;