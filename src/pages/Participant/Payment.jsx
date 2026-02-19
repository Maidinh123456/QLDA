import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { tickets } from '../../mockData';
const Payment = () => {
  const [ticketId, setTicketId] = useState('');
  const [localTickets, setLocalTickets] = useState(tickets);
  const [flash, setFlash] = useState('');
  const handlePay = () => {
    const found = localTickets.find(t => t.id === parseInt(ticketId));
    if (!found) { setFlash('notfound'); } else if (found.paid) { setFlash('already'); } else { setLocalTickets(prev => prev.map(t => t.id === parseInt(ticketId) ? { ...t, paid: true } : t)); setFlash('success'); setTicketId(''); }
    setTimeout(() => setFlash(''), 2500);
  };
  const unpaid = localTickets.filter(t => !t.paid);
  const inp = { width: "100%", boxSizing: "border-box", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "11px 13px", color: "#111827", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" };
  return (
    <MainLayout role="participant">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #059669, #047857)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(5,150,105,0.25)" }}>💳</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Thanh toán vé</h1>
          </div>
          <p style={{ color: "#9ca3af", fontSize: "14px", margin: "4px 0 0 52px" }}>{unpaid.length} vé chưa thanh toán</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "24px", alignItems: "start" }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "16px" }}>Nhập mã vé</div>
            <input type="text" value={ticketId} placeholder="Nhập ID vé..." onChange={(e) => setTicketId(e.target.value)} style={{ ...inp, marginBottom: "14px" }}
              onFocus={(e) => { e.target.style.borderColor = "#059669"; e.target.style.boxShadow = "0 0 0 3px rgba(5,150,105,0.1)"; e.target.style.background = "#fff"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }} />
            {flash === 'success' && <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", padding: "10px 13px", marginBottom: "12px", color: "#059669", fontSize: "13px" }}>✓ Thanh toán thành công!</div>}
            {flash === 'notfound' && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "10px 13px", marginBottom: "12px", color: "#dc2626", fontSize: "13px" }}>⚠ Không tìm thấy vé!</div>}
            {flash === 'already' && <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "10px 13px", marginBottom: "12px", color: "#d97706", fontSize: "13px" }}>ℹ Vé này đã được thanh toán.</div>}
            <button onClick={handlePay} style={{ width: "100%", background: "linear-gradient(135deg, #059669, #047857)", border: "none", borderRadius: "10px", padding: "12px", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: "0 4px 12px rgba(5,150,105,0.25)" }}>💳 Thanh toán ngay</button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Vé chưa thanh toán ({unpaid.length})</span>
            </div>
            {unpaid.length === 0 ? <div style={{ padding: "40px", textAlign: "center" }}><div style={{ fontSize: "32px", marginBottom: "8px" }}>🎉</div><p style={{ color: "#9ca3af", margin: 0 }}>Tất cả vé đã được thanh toán!</p></div>
            : unpaid.map((t, i) => (
              <div key={t.id} style={{ padding: "14px 22px", borderBottom: i < unpaid.length - 1 ? "1px solid #f9fafb" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><div style={{ fontWeight: 500, color: "#111827", fontSize: "14px" }}>{t.event}</div><div style={{ fontSize: "12px", color: "#9ca3af" }}>ID: #{t.id}</div></div>
                <button onClick={() => setTicketId(String(t.id))} style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "8px", padding: "6px 12px", color: "#059669", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Chọn</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default Payment;