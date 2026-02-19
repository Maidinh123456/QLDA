import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { surveys, events } from '../../mockData';
const Survey = () => {
  const [eventId, setEventId] = useState(''); const [feedback, setFeedback] = useState('');
  const [localSurveys, setLocalSurveys] = useState(surveys); const [flash, setFlash] = useState(false);
  const handleSubmit = () => {
    if (eventId && feedback) { setLocalSurveys([...localSurveys, { id: localSurveys.length + 1, eventId: parseInt(eventId), feedback }]); setEventId(''); setFeedback(''); setFlash(true); setTimeout(() => setFlash(false), 2000); }
  };
  const getEv = (id) => events.find(e => e.id === id)?.name || `Event #${id}`;
  const sel = { width: "100%", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "11px 13px", color: "#111827", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: "border-box" };
  return (
    <MainLayout role="participant">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #8b5cf6, #6366f1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(139,92,246,0.25)" }}>💬</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Khảo sát sự kiện</h1>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: "24px", alignItems: "start" }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "16px" }}>Gửi phản hồi</div>
            <div style={{ marginBottom: "14px" }}><label style={{ display: "block", color: "#6b7280", fontSize: "11px", fontWeight: 600, marginBottom: "7px", letterSpacing: "0.5px" }}>SỰ KIỆN</label>
            <select value={eventId} onChange={(e) => setEventId(e.target.value)} style={sel}><option value="">Chọn sự kiện...</option>{events.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}</select></div>
            <div style={{ marginBottom: "16px" }}><label style={{ display: "block", color: "#6b7280", fontSize: "11px", fontWeight: 600, marginBottom: "7px", letterSpacing: "0.5px" }}>PHẢN HỒI CỦA BẠN</label>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Chia sẻ trải nghiệm của bạn..." style={{ ...sel, minHeight: "110px", resize: "vertical", lineHeight: 1.6 }}
              onFocus={(e) => { e.target.style.borderColor = "#8b5cf6"; e.target.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.1)"; e.target.style.background = "#fff"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }} /></div>
            {flash && <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", padding: "10px 13px", marginBottom: "12px", color: "#059669", fontSize: "13px" }}>✓ Cảm ơn phản hồi của bạn!</div>}
            <button onClick={handleSubmit} disabled={!eventId || !feedback} style={{ width: "100%", background: (!eventId || !feedback) ? "#e5e7eb" : "linear-gradient(135deg, #8b5cf6, #6366f1)", border: "none", borderRadius: "10px", padding: "12px", color: (!eventId || !feedback) ? "#9ca3af" : "#fff", fontSize: "14px", fontWeight: 600, cursor: (!eventId || !feedback) ? "not-allowed" : "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>💬 Gửi khảo sát</button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}><span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Phản hồi đã gửi ({localSurveys.length})</span></div>
            {localSurveys.map((s, i) => (
              <div key={s.id} style={{ padding: "16px 22px", borderBottom: i < localSurveys.length - 1 ? "1px solid #f9fafb" : "none" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#8b5cf6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "5px" }}>{getEv(s.eventId)}</div>
                <div style={{ fontSize: "13px", color: "#374151", fontStyle: "italic" }}>"{s.feedback}"</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default Survey;