import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events, scripts } from '../../mockData';

const quickTemplates = [
  "08:00 - Đón khách, check-in, phát tài liệu",
  "08:30 - Khai mạc, giới thiệu chương trình",
  "09:00 - Keynote chính: Chủ đề sự kiện",
  "10:30 - Tea break, networking",
  "11:00 - Panel thảo luận & Q&A",
  "12:00 - Tổng kết, bế mạc",
];

const CreateScript = () => {
  const [scriptContent, setScriptContent] = useState('');
  const [eventId, setEventId] = useState(events[0]?.id ? String(events[0].id) : '');
  const [localScripts, setLocalScripts] = useState(scripts);
  const [flash, setFlash] = useState(false);

  const handleSave = () => {
    if (!scriptContent.trim()) return;
    setLocalScripts([...localScripts, { id: localScripts.length + 1, eventId: Number(eventId), content: scriptContent, approved: false }]);
    setScriptContent('');
    setFlash(true);
    setTimeout(() => setFlash(false), 2000);
  };

  return (
    <MainLayout role="staff">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(99,102,241,0.25)" }}>📝</div>
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Lập kịch bản sự kiện</h1>
              <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "3px" }}>Soạn timeline, nội dung MC và các hạng mục chính</div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "22px" }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "22px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "12px" }}>Soạn kịch bản</div>
            <select value={eventId} onChange={(e) => setEventId(e.target.value)} style={{ width: "100%", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "10px 12px", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "12px" }}>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>{ev.name}</option>
              ))}
            </select>
            <textarea value={scriptContent} onChange={(e) => setScriptContent(e.target.value)} placeholder="Nhập nội dung kịch bản sự kiện..." style={{ width: "100%", boxSizing: "border-box", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "12px 13px", color: "#111827", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "210px", resize: "vertical", lineHeight: 1.7, marginBottom: "14px" }}
              onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; e.target.style.background = "#fff"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
              {quickTemplates.map((item) => (
                <button key={item} onClick={() => setScriptContent((prev) => (prev ? `${prev}\n${item}` : item))} style={{ background: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: "8px", padding: "6px 10px", color: "#4338ca", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item}</button>
              ))}
            </div>
            {flash && <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", padding: "10px 13px", marginBottom: "12px", color: "#059669", fontSize: "13px" }}>✓ Kịch bản đã được lưu!</div>}
            <button onClick={handleSave} disabled={!scriptContent.trim()} style={{ width: "100%", background: scriptContent.trim() ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#e5e7eb", border: "none", borderRadius: "10px", padding: "12px", color: scriptContent.trim() ? "#fff" : "#9ca3af", fontSize: "14px", fontWeight: 600, cursor: scriptContent.trim() ? "pointer" : "not-allowed", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>💾 Lưu kịch bản</button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "15px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Kịch bản hiện có ({localScripts.length})</span>
            </div>
            <div style={{ maxHeight: "420px", overflowY: "auto" }}>
              {localScripts.map((s, i) => {
                const eventName = events.find((ev) => ev.id === s.eventId)?.name || `Event #${s.eventId}`;
                return (
                  <div key={s.id} style={{ padding: "15px 22px", borderBottom: i < localScripts.length - 1 ? "1px solid #f9fafb" : "none" }}>
                    <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "6px" }}>{eventName}</div>
                    <div style={{ fontSize: "13px", color: "#111827", marginBottom: "6px", lineHeight: 1.6, whiteSpace: "pre-line" }}>{s.content}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", color: "#9ca3af" }}>Mã kịch bản: #{s.id}</span>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: s.approved ? "#059669" : "#d97706", background: s.approved ? "#ecfdf5" : "#fffbeb", border: `1px solid ${s.approved ? "#a7f3d0" : "#fde68a"}`, borderRadius: "5px", padding: "2px 7px" }}>{s.approved ? "Đã duyệt" : "Chờ duyệt"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateScript;
