import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events, tasks, equipment } from '../../mockData';
const StaffDashboard = () => {
  const done = tasks.filter(t => t.done).length;
  const ready = equipment.filter(e => e.status === "Sẵn sàng").length;
  return (
    <MainLayout role="staff">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #059669, #047857)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(5,150,105,0.25)" }}>👷</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Staff Dashboard</h1>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "14px", marginBottom: "24px" }}>
          {[{ label: "Sự kiện", value: events.length, icon: "🗓", color: "#6366f1" }, { label: "Nhiệm vụ", value: tasks.length, icon: "📝", color: "#8b5cf6" }, { label: "Đã xong", value: done, icon: "✅", color: "#059669" }, { label: "Thiết bị OK", value: ready, icon: "🔧", color: "#d97706" }].map(({ label, value, icon, color }) => (
            <div key={label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>{icon}</div>
              <div><div style={{ fontSize: "22px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>{value}</div><div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "3px" }}>{label}</div></div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "18px" }}>
          {[
            { title: "Sự kiện", items: events, render: (ev) => <div><div style={{ fontSize: "13px", fontWeight: 500, color: "#111827" }}>{ev.name}</div><div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{ev.date}</div></div> },
            { title: "Nhiệm vụ", items: tasks, render: (t) => <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><div style={{ width: "18px", height: "18px", borderRadius: "5px", background: t.done ? "#d1fae5" : "#eef2ff", border: `1.5px solid ${t.done ? "#a7f3d0" : "#c7d2fe"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: t.done ? "#059669" : "#6366f1", flexShrink: 0 }}>{t.done ? "✓" : ""}</div><span style={{ fontSize: "13px", color: t.done ? "#9ca3af" : "#111827", textDecoration: t.done ? "line-through" : "none" }}>{t.task}</span></div> },
            { title: "Thiết bị", items: equipment, render: (eq) => { const color = eq.status === "Sẵn sàng" ? "#059669" : eq.status === "Đang sử dụng" ? "#d97706" : "#dc2626"; return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "13px", color: "#111827" }}>{eq.name}</span><div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, boxShadow: `0 0 0 3px ${color}33` }} /></div>; } },
          ].map(({ title, items, render }) => (
            <div key={title} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}><span style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>{title}</span></div>
              {items.map((item, i) => <div key={item.id} style={{ padding: "11px 18px", borderBottom: i < items.length - 1 ? "1px solid #f9fafb" : "none" }}>{render(item)}</div>)}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
export default StaffDashboard;