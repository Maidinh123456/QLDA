import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { reports } from '../../mockData';

const ViewReport = () => (
  <MainLayout role="manager">
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #8b5cf6, #6366f1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(139,92,246,0.25)" }}>📈</div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Báo cáo sự kiện</h1>
        </div>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Chi tiết báo cáo</span>
        </div>
        {reports.map((r, i) => (
          <div key={r.id} style={{ padding: "18px 22px", borderBottom: i < reports.length - 1 ? "1px solid #f9fafb" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", transition: "background 0.15s" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
            <div>
              <div style={{ fontWeight: 600, color: "#111827", marginBottom: "3px" }}>{r.event}</div>
              <div style={{ fontSize: "13px", color: "#9ca3af" }}>Kết quả: {r.result}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#059669" }}>{r.revenue}</div>
              <div style={{ fontSize: "11px", color: "#9ca3af" }}>Doanh thu</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </MainLayout>
);
export default ViewReport;