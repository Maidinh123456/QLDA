import React, { useMemo, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events, participants } from '../../mockData';

const Attendance = () => {
  const [participantId, setParticipantId] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id ? String(events[0].id) : '');
  const [search, setSearch] = useState('');
  const [flash, setFlash] = useState('');
  const [localParticipants, setLocalParticipants] = useState(participants);

  const filteredParticipants = useMemo(() => {
    const key = search.trim().toLowerCase();
    return localParticipants.filter((p) => {
      const matchEvent = selectedEventId ? p.eventId === Number(selectedEventId) : true;
      const matchSearch = !key || p.name.toLowerCase().includes(key) || String(p.id).includes(key);
      return matchEvent && matchSearch;
    });
  }, [localParticipants, search, selectedEventId]);

  const checkedInCount = filteredParticipants.filter((p) => p.checkedIn).length;
  const totalCount = filteredParticipants.length;

  const handleCheckIn = () => {
    const id = Number(participantId);
    if (!id) {
      setFlash('Vui lòng nhập mã người tham dự.');
      setTimeout(() => setFlash(''), 2000);
      return;
    }

    let updated = false;
    setLocalParticipants((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          updated = true;
          return { ...p, checkedIn: true };
        }
        return p;
      })
    );
    setFlash(updated ? `Đã ghi nhận tham dự cho mã #${id}.` : `Không tìm thấy người tham dự với mã #${id}.`);
    setParticipantId('');
    setTimeout(() => setFlash(''), 2200);
  };

  const handleToggle = (id) => {
    setLocalParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checkedIn: !p.checkedIn } : p))
    );
  };

  return (
    <MainLayout role="staff">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #10b981, #059669)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(16,185,129,0.25)" }}>✅</div>
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Ghi nhận tham dự</h1>
              <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "3px" }}>Theo dõi check-in theo sự kiện và cập nhật nhanh</div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px", marginBottom: "22px" }}>
          {[{ label: "Tổng người", value: totalCount, icon: "👥", color: "#6366f1" }, { label: "Đã vào", value: checkedInCount, icon: "🟢", color: "#059669" }, { label: "Chưa vào", value: totalCount - checkedInCount, icon: "🟡", color: "#d97706" }].map(({ label, value, icon, color }) => (
            <div key={label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: `${color}1a`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>{icon}</div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "18px", marginBottom: "22px" }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "12px" }}>Ghi nhận nhanh</div>
            <div style={{ display: "grid", gap: "10px" }}>
              <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)} style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "10px 12px", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>Sự kiện: {ev.name}</option>
                ))}
              </select>
              <input value={participantId} onChange={(e) => setParticipantId(e.target.value)} placeholder="Mã người tham dự (ID)" style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "10px 12px", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", outline: "none" }}
                onFocus={(e) => { e.target.style.borderColor = "#10b981"; e.target.style.boxShadow = "0 0 0 3px rgba(16,185,129,0.12)"; e.target.style.background = "#fff"; }}
                onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }} />
              {flash && <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#059669", borderRadius: "10px", padding: "8px 12px", fontSize: "12px" }}>{flash}</div>}
              <button onClick={handleCheckIn} style={{ background: "linear-gradient(135deg, #10b981, #059669)", border: "none", borderRadius: "10px", padding: "10px 12px", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Ghi nhận tham dự</button>
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "12px" }}>Lọc danh sách</div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm theo tên hoặc ID..." style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "10px 12px", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", outline: "none" }}
              onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; e.target.style.background = "#fff"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }} />
            <div style={{ marginTop: "12px", fontSize: "12px", color: "#9ca3af" }}>Đang hiển thị {filteredParticipants.length} người tham dự.</div>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ padding: "15px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Danh sách người tham dự</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  {["ID", "Họ tên", "Sự kiện", "Trạng thái", "Thao tác"].map((h) => (
                    <th key={h} style={{ padding: "12px 22px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #f3f4f6" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((p, i) => {
                  const eventName = events.find((ev) => ev.id === p.eventId)?.name || `Event #${p.eventId}`;
                  return (
                    <tr key={p.id} style={{ borderBottom: i < filteredParticipants.length - 1 ? "1px solid #f9fafb" : "none" }}>
                      <td style={{ padding: "13px 22px", color: "#9ca3af", fontSize: "13px" }}>#{p.id}</td>
                      <td style={{ padding: "13px 22px", color: "#111827", fontWeight: 500, fontSize: "14px" }}>{p.name}</td>
                      <td style={{ padding: "13px 22px", color: "#6b7280", fontSize: "13px" }}>{eventName}</td>
                      <td style={{ padding: "13px 22px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: p.checkedIn ? "#059669" : "#d97706", background: p.checkedIn ? "#ecfdf5" : "#fffbeb", border: `1px solid ${p.checkedIn ? "#a7f3d0" : "#fde68a"}`, borderRadius: "6px", padding: "2px 8px" }}>{p.checkedIn ? "✓ Đã vào" : "Chờ check-in"}</span>
                      </td>
                      <td style={{ padding: "13px 22px" }}>
                        <button onClick={() => handleToggle(p.id)} style={{ background: p.checkedIn ? "#fef2f2" : "#ecfdf5", color: p.checkedIn ? "#dc2626" : "#059669", border: "1px solid", borderColor: p.checkedIn ? "#fecaca" : "#a7f3d0", borderRadius: "8px", padding: "6px 10px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>{p.checkedIn ? "Hủy ghi nhận" : "Ghi nhận"}</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Attendance;