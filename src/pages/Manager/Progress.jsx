import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events } from '../../mockData';

const Progress = () => {
  const [localEvents, setLocalEvents] = useState(events);
  const upd = (id, v) => setLocalEvents(prev => prev.map(ev => ev.id === id ? { ...ev, progress: Math.max(0, Math.min(100, parseInt(v)||0)) } : ev));
  const getColor = (p) => p >= 80 ? "#059669" : p >= 40 ? "#6366f1" : "#d97706";
  return (
    <MainLayout role="manager">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(99,102,241,0.25)" }}>📊</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Tiến độ sự kiện</h1>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {localEvents.map(ev => {
            const color = getColor(ev.progress);
            return (
              <div key={ev.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "22px 26px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "#111827", marginBottom: "3px" }}>{ev.name}</div>
                    <div style={{ fontSize: "12px", color: "#9ca3af" }}>📅 {ev.date} &nbsp; 📍 {ev.location}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "26px", fontWeight: 700, color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{ev.progress}%</span>
                    <input type="number" min="0" max="100" placeholder="0–100" onChange={(e) => upd(ev.id, e.target.value)} style={{ width: "75px", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "8px", padding: "7px 10px", color: "#111827", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", textAlign: "center" }}
                      onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }} />
                  </div>
                </div>
                <div style={{ background: "#f3f4f6", borderRadius: "6px", height: "10px", overflow: "hidden" }}>
                  <div style={{ width: `${ev.progress}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}aa)`, borderRadius: "6px", transition: "width 0.4s" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};
export default Progress;