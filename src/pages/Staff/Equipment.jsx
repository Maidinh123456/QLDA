import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { equipment } from '../../mockData';
const Equipment = () => {
  const [localEquipment, setLocalEquipment] = useState(equipment);
  const handleUpdate = (id, newStatus) => setLocalEquipment(prev => prev.map(eq => eq.id === id ? { ...eq, status: newStatus } : eq));
  const sc = { "Sẵn sàng": { c: "#059669", bg: "#ecfdf5", b: "#a7f3d0", dot: "#059669" }, "Đang sử dụng": { c: "#d97706", bg: "#fffbeb", b: "#fde68a", dot: "#d97706" }, "Hỏng": { c: "#dc2626", bg: "#fef2f2", b: "#fecaca", dot: "#dc2626" } };
  return (
    <MainLayout role="staff">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #d97706, #b45309)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(217,119,6,0.25)" }}>🔧</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Quản lý thiết bị</h1>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px", marginBottom: "24px" }}>
          {Object.entries(sc).map(([status, cfg]) => (
            <div key={status} style={{ background: cfg.bg, border: `1px solid ${cfg.b}`, borderRadius: "14px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
              <div><div style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>{localEquipment.filter(e => e.status === status).length}</div><div style={{ fontSize: "12px", color: "#6b7280" }}>{status}</div></div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ padding: "15px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}><span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Thiết bị ({localEquipment.length})</span></div>
          {localEquipment.map((item, i) => {
            const cfg = sc[item.status] || sc["Sẵn sàng"];
            return (
              <div key={item.id} style={{ padding: "15px 22px", borderBottom: i < localEquipment.length - 1 ? "1px solid #f9fafb" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: cfg.dot, boxShadow: `0 0 0 3px ${cfg.dot}33`, flexShrink: 0 }} />
                  <div><div style={{ fontWeight: 500, color: "#111827", fontSize: "14px" }}>{item.name}</div><span style={{ background: cfg.bg, color: cfg.c, borderRadius: "5px", padding: "1px 7px", fontSize: "11px", fontWeight: 600 }}>{item.status}</span></div>
                </div>
                <select value={item.status} onChange={(e) => handleUpdate(item.id, e.target.value)} style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "8px", padding: "7px 10px", color: "#111827", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>
                  <option>Sẵn sàng</option><option>Đang sử dụng</option><option>Hỏng</option>
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};
export default Equipment;