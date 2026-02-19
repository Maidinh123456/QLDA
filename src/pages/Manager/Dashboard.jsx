import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events, tasks } from '../../mockData';

const ManagerDashboard = () => {
  const done = tasks.filter(t => t.done).length;
  const card = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" };
  return (
    <MainLayout role="manager">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(99,102,241,0.25)" }}>🎯</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Manager Dashboard</h1>
          </div>
          <p style={{ color: "#9ca3af", fontSize: "14px", margin: "4px 0 0 52px" }}>Quản lý sự kiện và nhiệm vụ</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "16px", marginBottom: "28px" }}>
          {[
            { label: "Sự kiện", value: events.length, icon: "🗓", color: "#6366f1" },
            { label: "Nhiệm vụ", value: tasks.length, icon: "📝", color: "#8b5cf6" },
            { label: "Hoàn thành", value: done, icon: "✅", color: "#059669" },
            { label: "Đang làm", value: tasks.length - done, icon: "⚡", color: "#d97706" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{icon}</div>
              <div>
                <div style={{ fontSize: "26px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "3px" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={card}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Sự kiện</span>
            </div>
            {events.map((ev, i) => (
              <div key={ev.id} style={{ padding: "14px 22px", borderBottom: i < events.length - 1 ? "1px solid #f9fafb" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontWeight: 500, color: "#111827", fontSize: "14px" }}>{ev.name}</span>
                  <span style={{ fontSize: "12px", color: "#9ca3af" }}>{ev.date}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ flex: 1, background: "#f3f4f6", borderRadius: "3px", height: "6px" }}>
                    <div style={{ width: `${ev.progress}%`, height: "100%", background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: "3px" }} />
                  </div>
                  <span style={{ fontSize: "11px", color: "#9ca3af" }}>{ev.progress}%</span>
                </div>
              </div>
            ))}
          </div>
          <div style={card}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Nhiệm vụ</span>
            </div>
            {tasks.map((t, i) => (
              <div key={t.id} style={{ padding: "13px 22px", borderBottom: i < tasks.length - 1 ? "1px solid #f9fafb" : "none", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: t.done ? "#d1fae5" : "#eef2ff", border: `1.5px solid ${t.done ? "#a7f3d0" : "#c7d2fe"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: t.done ? "#059669" : "#6366f1", flexShrink: 0 }}>{t.done ? "✓" : ""}</div>
                <div>
                  <div style={{ fontSize: "13px", color: t.done ? "#9ca3af" : "#111827", textDecoration: t.done ? "line-through" : "none" }}>{t.task}</div>
                  <div style={{ fontSize: "11px", color: "#9ca3af" }}>👤 {t.staff}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManagerDashboard;