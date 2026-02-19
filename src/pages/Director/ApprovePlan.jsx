import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events } from '../../mockData';

const ApprovePlan = () => {
  const [localEvents, setLocalEvents] = useState(events);
  const [justApproved, setJustApproved] = useState(null);

  const handleApprove = (id) => {
    setJustApproved(id);
    setTimeout(() => { setLocalEvents(prev => prev.map(ev => ev.id === id ? { ...ev, approved: true } : ev)); setJustApproved(null); }, 500);
  };

  const pending = localEvents.filter(ev => !ev.approved);
  const approved = localEvents.filter(ev => ev.approved);

  return (
    <MainLayout role="director">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #f59e0b, #d97706)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(245,158,11,0.25)" }}>📋</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Phê duyệt kế hoạch</h1>
          </div>
          <p style={{ color: "#9ca3af", fontSize: "14px", margin: "4px 0 0 52px" }}>{pending.length} kế hoạch đang chờ phê duyệt</p>
        </div>

        {pending.length === 0 ? (
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "56px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎉</div>
            <p style={{ color: "#6b7280", fontSize: "16px", margin: 0 }}>Tất cả kế hoạch đã được phê duyệt!</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "4px" }}>⏳ Chờ duyệt ({pending.length})</div>
            {pending.map(ev => (
              <div key={ev.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", opacity: justApproved === ev.id ? 0.5 : 1, transition: "opacity 0.4s" }}>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: "#111827", marginBottom: "5px" }}>{ev.name}</div>
                  <div style={{ fontSize: "13px", color: "#9ca3af", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <span>📅 {ev.date}</span>
                    <span>📍 {ev.location}</span>
                    <span style={{ background: "#fffbeb", color: "#d97706", border: "1px solid #fde68a", borderRadius: "5px", padding: "1px 7px", fontSize: "11px", fontWeight: 600 }}>{ev.status}</span>
                  </div>
                </div>
                <button onClick={() => handleApprove(ev.id)} disabled={justApproved === ev.id} style={{ background: "linear-gradient(135deg, #059669, #047857)", border: "none", borderRadius: "10px", padding: "10px 20px", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 10px rgba(5,150,105,0.25)", fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap" }}>
                  {justApproved === ev.id ? "Đang duyệt..." : "✓ Phê duyệt"}
                </button>
              </div>
            ))}
          </div>
        )}

        {approved.length > 0 && (
          <>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 10px 0" }}>✅ Đã phê duyệt ({approved.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {approved.map(ev => (
                <div key={ev.id} style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "12px", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ color: "#065f46", fontWeight: 500, fontSize: "14px" }}>{ev.name}</span>
                    <span style={{ color: "#9ca3af", fontSize: "13px", marginLeft: "12px" }}>{ev.date}</span>
                  </div>
                  <span style={{ color: "#059669", background: "#d1fae5", border: "1px solid #a7f3d0", borderRadius: "6px", padding: "3px 10px", fontSize: "12px", fontWeight: 600 }}>Đã duyệt</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ApprovePlan;