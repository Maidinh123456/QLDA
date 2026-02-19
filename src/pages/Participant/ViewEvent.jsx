import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events } from '../../mockData';
const statusCfg = { "Đang chuẩn bị": { c: "#d97706", bg: "#fffbeb", b: "#fde68a" }, "Đang diễn ra": { c: "#059669", bg: "#ecfdf5", b: "#a7f3d0" }, "Hoàn thành": { c: "#6366f1", bg: "#eef2ff", b: "#c7d2fe" } };
const ViewEvent = () => {
  const [selectedEventId, setSelectedEventId] = useState('');
  const selectedEvent = events.find(ev => ev.id === parseInt(selectedEventId));
  const sc = selectedEvent ? (statusCfg[selectedEvent.status] || statusCfg["Đang chuẩn bị"]) : null;
  return (
    <MainLayout role="participant">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #0891b2, #6366f1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(8,145,178,0.25)" }}>📋</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Chi tiết sự kiện</h1>
          </div>
        </div>
        <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)} style={{ maxWidth: "480px", width: "100%", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: "12px", padding: "13px 16px", color: "#111827", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <option value="">Chọn sự kiện để xem chi tiết...</option>
          {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
        </select>
        {selectedEvent ? (
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ background: `linear-gradient(135deg, ${sc.bg}, #f9fafb)`, borderBottom: `1px solid ${sc.b}`, padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div><h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "0 0 5px 0" }}>{selectedEvent.name}</h2><p style={{ color: "#9ca3af", margin: 0, fontSize: "13px" }}>ID: #{selectedEvent.id}</p></div>
              {sc && <span style={{ background: sc.bg, color: sc.c, border: `1px solid ${sc.b}`, borderRadius: "8px", padding: "6px 14px", fontSize: "13px", fontWeight: 600 }}>{selectedEvent.status}</span>}
            </div>
            <div style={{ padding: "24px 28px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
              {[["Ngày diễn ra", selectedEvent.date, "📅"], ["Địa điểm", selectedEvent.location, "📍"], ["Tiến độ", `${selectedEvent.progress}%`, "📊"], ["Phê duyệt", selectedEvent.approved ? "Đã phê duyệt" : "Chưa phê duyệt", selectedEvent.approved ? "✅" : "⏳"]].map(([label, value, icon]) => (
                <div key={label}><div style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>{icon} {label}</div><div style={{ fontSize: "16px", color: "#111827", fontWeight: 500 }}>{value}</div></div>
              ))}
            </div>
            <div style={{ padding: "0 28px 24px" }}>
              <div style={{ background: "#f3f4f6", borderRadius: "6px", height: "8px" }}>
                <div style={{ width: `${selectedEvent.progress}%`, height: "100%", background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: "6px", transition: "width 0.4s" }} />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "60px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎪</div>
            <p style={{ color: "#9ca3af", fontSize: "15px", margin: 0 }}>Chọn một sự kiện để xem chi tiết</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
export default ViewEvent;