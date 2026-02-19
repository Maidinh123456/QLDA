import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events, participants } from '../../mockData';
const RegisterEvent = () => {
  const [eventId, setEventId] = useState('');
  const [localParticipants, setLocalParticipants] = useState(participants);
  const [flash, setFlash] = useState(false);
  const selectedEv = events.find(ev => ev.id === parseInt(eventId));
  const handleRegister = () => {
    if (!eventId) return;
    setLocalParticipants([...localParticipants, { id: localParticipants.length + 1, eventId: parseInt(eventId), name: 'New Participant', checkedIn: false }]);
    setFlash(true); setEventId(''); setTimeout(() => setFlash(false), 2000);
  };
  return (
    <MainLayout role="participant">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #0891b2, #6366f1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(8,145,178,0.25)" }}>🎫</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Đăng ký sự kiện</h1>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "24px", alignItems: "start" }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "16px" }}>Chọn sự kiện</div>
            <select value={eventId} onChange={(e) => setEventId(e.target.value)} style={{ width: "100%", boxSizing: "border-box", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "11px 13px", color: "#111827", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "14px" }}>
              <option value="">Chọn sự kiện...</option>
              {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
            </select>
            {selectedEv && <div style={{ background: "#ecfeff", border: "1px solid #a5f3fc", borderRadius: "10px", padding: "13px", marginBottom: "14px" }}><div style={{ fontSize: "14px", fontWeight: 600, color: "#0e7490", marginBottom: "5px" }}>{selectedEv.name}</div><div style={{ fontSize: "12px", color: "#6b7280" }}>📅 {selectedEv.date}</div><div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>📍 {selectedEv.location}</div></div>}
            {flash && <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", padding: "10px 13px", marginBottom: "12px", color: "#059669", fontSize: "13px" }}>✓ Đăng ký thành công!</div>}
            <button onClick={handleRegister} disabled={!eventId} style={{ width: "100%", background: eventId ? "linear-gradient(135deg, #0891b2, #6366f1)" : "#e5e7eb", border: "none", borderRadius: "10px", padding: "12px", color: eventId ? "#fff" : "#9ca3af", fontSize: "14px", fontWeight: 600, cursor: eventId ? "pointer" : "not-allowed", fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: eventId ? "0 4px 12px rgba(8,145,178,0.25)" : "none" }}>🎫 Đăng ký tham gia</button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}><span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Sự kiện có thể tham gia</span></div>
            {events.map((ev, i) => (
              <div key={ev.id} onClick={() => setEventId(String(ev.id))} style={{ padding: "15px 22px", borderBottom: i < events.length - 1 ? "1px solid #f9fafb" : "none", cursor: "pointer", background: eventId === String(ev.id) ? "#ecfeff" : "transparent", borderLeft: eventId === String(ev.id) ? "3px solid #0891b2" : "3px solid transparent", transition: "all 0.15s" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"}
                onMouseLeave={(e) => e.currentTarget.style.background = eventId === String(ev.id) ? "#ecfeff" : "transparent"}>
                <div style={{ fontWeight: 500, color: "#111827", marginBottom: "3px", fontSize: "14px" }}>{ev.name}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>📅 {ev.date} &nbsp; 📍 {ev.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default RegisterEvent;