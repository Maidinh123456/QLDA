import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { tickets } from '../../mockData';
const CancelTicket = () => {
  const [ticketId, setTicketId] = useState('');
  const [localTickets, setLocalTickets] = useState(tickets);
  const [flash, setFlash] = useState('');
  const handleCancel = () => {
    const found = localTickets.find(t => t.id === parseInt(ticketId));
    if (!found) { setFlash('error'); } else { setLocalTickets(prev => prev.filter(t => t.id !== parseInt(ticketId))); setFlash('success'); setTicketId(''); }
    setTimeout(() => setFlash(''), 2500);
  };
  const inp = { width: "100%", boxSizing: "border-box", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "11px 13px", color: "#111827", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" };
  return (
    <MainLayout role="participant">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #dc2626, #b91c1c)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(220,38,38,0.25)" }}>🚫</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Hủy vé</h1>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "24px", alignItems: "start" }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "16px" }}>Nhập mã vé cần hủy</div>
            <input type="text" value={ticketId} placeholder="Nhập ID vé..." onChange={(e) => setTicketId(e.target.value)} style={{ ...inp, marginBottom: "14px" }}
              onFocus={(e) => { e.target.style.borderColor = "#dc2626"; e.target.style.boxShadow = "0 0 0 3px rgba(220,38,38,0.1)"; e.target.style.background = "#fff"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }} />
            {flash === 'success' && <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", padding: "10px 13px", marginBottom: "12px", color: "#059669", fontSize: "13px" }}>✓ Đã hủy vé thành công!</div>}
            {flash === 'error' && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "10px 13px", marginBottom: "12px", color: "#dc2626", fontSize: "13px" }}>⚠ Không tìm thấy vé #{ticketId}</div>}
            <button onClick={handleCancel} style={{ width: "100%", background: "linear-gradient(135deg, #dc2626, #b91c1c)", border: "none", borderRadius: "10px", padding: "12px", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: "0 4px 12px rgba(220,38,38,0.25)" }}>🚫 Hủy vé</button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}><span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Vé của bạn ({localTickets.length})</span></div>
            {localTickets.length === 0 ? <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af" }}>Không có vé nào.</div>
            : localTickets.map((t, i) => (
              <div key={t.id} style={{ padding: "14px 22px", borderBottom: i < localTickets.length - 1 ? "1px solid #f9fafb" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><div style={{ fontWeight: 500, color: "#111827", fontSize: "14px" }}>{t.event}</div><div style={{ fontSize: "12px", color: "#9ca3af" }}>ID: #{t.id}</div></div>
                <span style={{ fontSize: "11px", fontWeight: 600, color: t.paid ? "#059669" : "#dc2626", background: t.paid ? "#ecfdf5" : "#fef2f2", border: `1px solid ${t.paid ? "#a7f3d0" : "#fecaca"}`, borderRadius: "5px", padding: "2px 8px" }}>{t.paid ? "Đã TT" : "Chưa TT"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default CancelTicket;