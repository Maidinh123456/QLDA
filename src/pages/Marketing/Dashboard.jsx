import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events, marketingContent } from '../../mockData';

const statusCfg = { "New": { c: "#6366f1", bg: "#eef2ff", b: "#c7d2fe" }, "Published": { c: "#059669", bg: "#ecfdf5", b: "#a7f3d0" }, "Draft": { c: "#d97706", bg: "#fffbeb", b: "#fde68a" } };

const MarketingDashboard = () => (
  <MainLayout role="marketing">
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #db2777, #9333ea)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(219,39,119,0.25)" }}>📣</div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Marketing Dashboard</h1>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        {[{ label: "Sự kiện", value: events.length, icon: "🗓", color: "#6366f1" }, { label: "Nội dung", value: marketingContent.length, icon: "📝", color: "#db2777" }, { label: "Đã xuất bản", value: marketingContent.filter(c => c.status === "Published").length, icon: "🚀", color: "#059669" }].map(({ label, value, icon, color }) => (
          <div key={label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{icon}</div>
            <div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "3px" }}>{label}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {[{ title: "Sự kiện", items: events, render: (ev) => <div key={ev.id}><div style={{ fontWeight: 500, color: "#111827", fontSize: "14px" }}>{ev.name}</div><div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>{ev.date}</div></div> },
          { title: "Nội dung Marketing", items: marketingContent, render: (c) => <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "13px", color: "#111827" }}>{c.title}</span><span style={{ background: (statusCfg[c.status]||statusCfg["New"]).bg, color: (statusCfg[c.status]||statusCfg["New"]).c, border: `1px solid ${(statusCfg[c.status]||statusCfg["New"]).b}`, borderRadius: "5px", padding: "2px 8px", fontSize: "11px", fontWeight: 600 }}>{c.status}</span></div> }
        ].map(({ title, items, render }) => (
          <div key={title} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>{title}</span>
            </div>
            {items.map((item, i) => (
              <div key={item.id} style={{ padding: "13px 22px", borderBottom: i < items.length - 1 ? "1px solid #f9fafb" : "none" }}>{render(item)}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </MainLayout>
);
export default MarketingDashboard;