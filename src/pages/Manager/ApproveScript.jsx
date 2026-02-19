import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { scripts } from '../../mockData';

const ApproveScript = () => {
  const [localScripts, setLocalScripts] = useState(scripts);
  const handleApprove = (id) => setLocalScripts(prev => prev.map(s => s.id === id ? { ...s, approved: true } : s));
  const pending = localScripts.filter(s => !s.approved);
  const approved = localScripts.filter(s => s.approved);
  return (
    <MainLayout role="manager">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #f59e0b, #d97706)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(245,158,11,0.25)" }}>📜</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Phê duyệt kịch bản</h1>
          </div>
          <p style={{ color: "#9ca3af", fontSize: "14px", margin: "4px 0 0 52px" }}>{pending.length} kịch bản chờ duyệt</p>
        </div>
        {pending.length > 0 && <><div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "10px" }}>⏳ Chờ duyệt</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
          {pending.map(s => (
            <div key={s.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div>
                <div style={{ fontSize: "14px", color: "#111827", marginBottom: "4px" }}>{s.content}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>Event #{s.eventId}</div>
              </div>
              <button onClick={() => handleApprove(s.id)} style={{ background: "linear-gradient(135deg, #059669, #047857)", border: "none", borderRadius: "10px", padding: "9px 18px", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 10px rgba(5,150,105,0.25)", fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap" }}>✓ Phê duyệt</button>
            </div>
          ))}
        </div></>}
        {approved.length > 0 && <><div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "10px" }}>✅ Đã duyệt</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {approved.map(s => (
            <div key={s.id} style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "12px", padding: "13px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#065f46", fontSize: "14px" }}>{s.content}</span>
              <span style={{ color: "#059669", background: "#d1fae5", border: "1px solid #a7f3d0", borderRadius: "6px", padding: "3px 10px", fontSize: "11px", fontWeight: 600 }}>Đã duyệt</span>
            </div>
          ))}
        </div></>}
      </div>
    </MainLayout>
  );
};
export default ApproveScript;