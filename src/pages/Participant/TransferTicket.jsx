import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { tickets } from '../../mockData';
const TransferTicket = () => {
  const [ticketId, setTicketId] = useState(''); const [recipient, setRecipient] = useState('');
  const [localTickets, setLocalTickets] = useState(tickets); const [flash, setFlash] = useState(false);
  const handleTransfer = () => {
    if (!ticketId || !recipient) return;
    setLocalTickets(prev => prev.map(t => t.id === parseInt(ticketId) ? { ...t, participant: recipient } : t));
    setTicketId(''); setRecipient(''); setFlash(true); setTimeout(() => setFlash(false), 2000);
  };
  const inp = { width: "100%", boxSizing: "border-box", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "11px 13px", color: "#111827", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" };
  return (
    <MainLayout role="participant">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #d97706, #b45309)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(217,119,6,0.25)" }}>🔄</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Chuyển nhượng vé</h1>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "24px", alignItems: "start" }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "16px" }}>Thông tin chuyển nhượng</div>
            {[["ID VÉ", ticketId, setTicketId, "Nhập ID vé..."], ["TÊN NGƯỜI NHẬN", recipient, setRecipient, "Nhập tên người nhận..."]].map(([label, val, set, ph]) => (
              <div key={label} style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", color: "#6b7280", fontSize: "11px", fontWeight: 600, marginBottom: "7px", letterSpacing: "0.5px" }}>{label}</label>
                <input type="text" value={val} placeholder={ph} onChange={(e) => set(e.target.value)} style={inp}
                  onFocus={(e) => { e.target.style.borderColor = "#d97706"; e.target.style.boxShadow = "0 0 0 3px rgba(217,119,6,0.1)"; e.target.style.background = "#fff"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }} />
              </div>
            ))}
            {flash && <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", padding: "10px 13px", marginBottom: "12px", color: "#059669", fontSize: "13px" }}>✓ Chuyển nhượng thành công!</div>}
            <button onClick={handleTransfer} disabled={!ticketId || !recipient} style={{ width: "100%", background: (!ticketId || !recipient) ? "#e5e7eb" : "linear-gradient(135deg, #d97706, #b45309)", border: "none", borderRadius: "10px", padding: "12px", color: (!ticketId || !recipient) ? "#9ca3af" : "#fff", fontSize: "14px", fontWeight: 600, cursor: (!ticketId || !recipient) ? "not-allowed" : "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: "4px" }}>🔄 Chuyển nhượng</button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}><span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Danh sách vé</span></div>
            {localTickets.map((t, i) => (
              <div key={t.id} style={{ padding: "14px 22px", borderBottom: i < localTickets.length - 1 ? "1px solid #f9fafb" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <div><div style={{ fontWeight: 500, color: "#111827", fontSize: "14px" }}>{t.event}</div><div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>ID: #{t.id} · Chủ: {t.participant}</div></div>
                <button onClick={() => setTicketId(String(t.id))} style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "8px", padding: "6px 12px", color: "#d97706", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap" }}>Chọn</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default TransferTicket;