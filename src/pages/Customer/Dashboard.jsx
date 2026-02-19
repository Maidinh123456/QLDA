import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events, participants, reports } from '../../mockData';
const CustomerDashboard = () => (
  <MainLayout role="customer">
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #0891b2, #059669)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(8,145,178,0.25)" }}>🏢</div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Customer Dashboard</h1>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "14px", marginBottom: "24px" }}>
        {[{ label: "Sự kiện", value: events.length, icon: "🗓", color: "#0891b2" }, { label: "Người tham dự", value: participants.length, icon: "👥", color: "#8b5cf6" }, { label: "Báo cáo", value: reports.length, icon: "📊", color: "#059669" }].map(({ label, value, icon, color }) => (
          <div key={label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>{icon}</div>
            <div><div style={{ fontSize: "22px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>{value}</div><div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "3px" }}>{label}</div></div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ padding: "15px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}><span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Sự kiện</span></div>
          {events.map((ev, i) => (
            <div key={ev.id} style={{ padding: "13px 22px", borderBottom: i < events.length - 1 ? "1px solid #f9fafb" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}><span style={{ fontWeight: 500, color: "#111827", fontSize: "13px" }}>{ev.name}</span><span style={{ fontSize: "11px", color: "#9ca3af" }}>{ev.date}</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ flex: 1, background: "#f3f4f6", borderRadius: "3px", height: "5px" }}><div style={{ width: `${ev.progress}%`, height: "100%", background: "linear-gradient(90deg, #0891b2, #6366f1)", borderRadius: "3px" }} /></div>
                <span style={{ fontSize: "11px", color: "#9ca3af" }}>{ev.progress}%</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "13px 20px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}><span style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Người tham dự</span></div>
            {participants.slice(0, 4).map((p, i) => <div key={p.id} style={{ padding: "10px 20px", borderBottom: i < 3 ? "1px solid #f9fafb" : "none", display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: "13px", color: "#111827" }}>{p.name}</span><span style={{ fontSize: "11px", color: "#9ca3af" }}>Event #{p.eventId}</span></div>)}
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "13px 20px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}><span style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Báo cáo</span></div>
            {reports.map((r, i) => <div key={r.id} style={{ padding: "10px 20px", borderBottom: i < reports.length - 1 ? "1px solid #f9fafb" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "13px", color: "#111827" }}>{r.event}</span><span style={{ fontSize: "13px", fontWeight: 700, color: "#059669" }}>{r.revenue}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
);
export default CustomerDashboard;