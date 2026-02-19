import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { reports } from '../../mockData';

const ViewReport = () => (
  <MainLayout role="director">
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #8b5cf6, #6366f1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(139,92,246,0.25)" }}>📈</div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Báo cáo tổng hợp</h1>
        </div>
        <p style={{ color: "#9ca3af", fontSize: "14px", margin: "4px 0 0 52px" }}>Kết quả và doanh thu các sự kiện</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Tổng báo cáo", value: reports.length, icon: "📄", color: "#6366f1" },
          { label: "Tổng doanh thu", value: reports.length + " sự kiện", icon: "💰", color: "#059669" },
        ].map(({ label, value, icon, color }) => (
          <div key={label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "20px 22px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>{icon}</div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>{label}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Chi tiết báo cáo</span>
        </div>
        {reports.map((r, i) => (
          <div key={r.id} style={{ padding: "18px 22px", borderBottom: i < reports.length - 1 ? "1px solid #f9fafb" : "none", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", transition: "background 0.15s" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
            <div>
              <div style={{ fontWeight: 600, color: "#111827", marginBottom: "3px" }}>{r.event}</div>
              <div style={{ fontSize: "13px", color: "#9ca3af" }}>Kết quả: {r.result}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#059669" }}>{r.revenue}</div>
              <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>Doanh thu</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </MainLayout>
);

export default ViewReport;