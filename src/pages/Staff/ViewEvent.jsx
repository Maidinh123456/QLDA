import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events } from '../../mockData';
const sc = { "Đang chuẩn bị": { c: "#d97706", bg: "#fffbeb", b: "#fde68a" }, "Đang diễn ra": { c: "#059669", bg: "#ecfdf5", b: "#a7f3d0" }, "Hoàn thành": { c: "#6366f1", bg: "#eef2ff", b: "#c7d2fe" } };
const ViewEvent = () => (
  <MainLayout role="staff">
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(99,102,241,0.25)" }}>🗓</div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Chi tiết sự kiện</h1>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {events.map(ev => {
          const cfg = sc[ev.status] || sc["Đang chuẩn bị"];
          return (
            <div key={ev.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ background: cfg.bg, borderBottom: `1px solid ${cfg.b}`, padding: "16px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111827", margin: 0 }}>{ev.name}</h2>
                <span style={{ background: "rgba(255,255,255,0.8)", color: cfg.c, border: `1px solid ${cfg.b}`, borderRadius: "6px", padding: "3px 10px", fontSize: "12px", fontWeight: 600 }}>{ev.status}</span>
              </div>
              <div style={{ padding: "16px 22px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
                {[["Ngày", ev.date, "📅"], ["Địa điểm", ev.location, "📍"], ["Tiến độ", `${ev.progress}%`, "📊"], ["Phê duyệt", ev.approved ? "Đã duyệt" : "Chưa", ev.approved ? "✅" : "⏳"]].map(([label, value, icon]) => (
                  <div key={label}><div style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{icon} {label}</div><div style={{ fontSize: "14px", color: "#111827", fontWeight: 500 }}>{value}</div></div>
                ))}
              </div>
              <div style={{ padding: "0 22px 16px" }}>
                <div style={{ background: "#f3f4f6", borderRadius: "4px", height: "6px" }}><div style={{ width: `${ev.progress}%`, height: "100%", background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: "4px" }} /></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </MainLayout>
);
export default ViewEvent;