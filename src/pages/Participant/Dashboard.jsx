import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { tickets, notifications, surveys } from '../../mockData';
const ParticipantDashboard = () => (
  <MainLayout role="participant">
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #0891b2, #6366f1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(8,145,178,0.25)" }}>🎟</div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Participant Dashboard</h1>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "14px", marginBottom: "28px" }}>
        {[{ label: "Vé của tôi", value: tickets.length, icon: "🎟", color: "#0891b2" }, { label: "Chưa TT", value: tickets.filter(t=>!t.paid).length, icon: "💳", color: "#d97706" }, { label: "Thông báo", value: notifications.length, icon: "🔔", color: "#8b5cf6" }, { label: "Khảo sát", value: surveys.length, icon: "📋", color: "#059669" }].map(({ label, value, icon, color }) => (
          <div key={label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>{icon}</div>
            <div><div style={{ fontSize: "22px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>{value}</div><div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "3px" }}>{label}</div></div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ padding: "15px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}><span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Vé của tôi</span></div>
          {tickets.map((t, i) => (
            <div key={t.id} style={{ padding: "13px 22px", borderBottom: i < tickets.length - 1 ? "1px solid #f9fafb" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>{t.event}</span>
              <span style={{ fontSize: "11px", fontWeight: 600, color: t.paid ? "#059669" : "#dc2626", background: t.paid ? "#ecfdf5" : "#fef2f2", border: `1px solid ${t.paid ? "#a7f3d0" : "#fecaca"}`, borderRadius: "5px", padding: "2px 8px" }}>{t.paid ? "Đã TT" : "Chưa TT"}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "13px 20px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}><span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>🔔 Thông báo</span></div>
            {notifications.map((n, i) => (
              <div key={n.id} style={{ padding: "11px 20px", borderBottom: i < notifications.length - 1 ? "1px solid #f9fafb" : "none", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8b5cf6", marginTop: "5px", flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: "#374151" }}>{n.message}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "13px 20px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}><span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>📋 Khảo sát</span></div>
            {surveys.map((s, i) => (
              <div key={s.id} style={{ padding: "11px 20px", borderBottom: i < surveys.length - 1 ? "1px solid #f9fafb" : "none", fontSize: "13px", color: "#374151", fontStyle: "italic" }}>"{s.feedback}"</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
);
export default ParticipantDashboard;