import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { participants } from '../../mockData';
const ParticipantList = () => {
  const checkedIn = participants.filter(p => p.checkedIn).length;
  return (
    <MainLayout role="staff">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #0891b2, #6366f1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(8,145,178,0.25)" }}>👥</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Danh sách người tham dự</h1>
          </div>
          <p style={{ color: "#9ca3af", fontSize: "14px", margin: "4px 0 0 52px" }}>{checkedIn}/{participants.length} đã check-in</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ padding: "15px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb", display: "flex", gap: "10px" }}>
            <span style={{ background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0", borderRadius: "20px", padding: "2px 10px", fontSize: "11px", fontWeight: 600 }}>{checkedIn} đã vào</span>
            <span style={{ background: "#fffbeb", color: "#d97706", border: "1px solid #fde68a", borderRadius: "20px", padding: "2px 10px", fontSize: "11px", fontWeight: 600 }}>{participants.length - checkedIn} chưa vào</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#f9fafb" }}>{["ID", "Tên", "Sự kiện", "Trạng thái"].map(h => <th key={h} style={{ padding: "11px 22px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #f3f4f6" }}>{h}</th>)}</tr></thead>
              <tbody>
                {participants.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: i < participants.length - 1 ? "1px solid #f9fafb" : "none", transition: "background 0.15s" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "13px 22px", color: "#9ca3af", fontSize: "13px" }}>#{p.id}</td>
                    <td style={{ padding: "13px 22px", color: "#111827", fontWeight: 500, fontSize: "14px" }}>{p.name}</td>
                    <td style={{ padding: "13px 22px", color: "#6b7280", fontSize: "13px" }}>Event #{p.eventId}</td>
                    <td style={{ padding: "13px 22px" }}><span style={{ fontSize: "11px", fontWeight: 600, color: p.checkedIn ? "#059669" : "#d97706", background: p.checkedIn ? "#ecfdf5" : "#fffbeb", border: `1px solid ${p.checkedIn ? "#a7f3d0" : "#fde68a"}`, borderRadius: "5px", padding: "2px 8px" }}>{p.checkedIn ? "✓ Đã vào" : "Chờ check-in"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default ParticipantList;