import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events } from '../../mockData';

const inp = { width: "100%", boxSizing: "border-box", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "11px 13px", color: "#111827", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.2s" };
const focus = (e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; e.target.style.background = "#fff"; };
const blur = (e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; };

const CreateEvent = () => {
  const [name, setName] = useState(''); const [date, setDate] = useState(''); const [location, setLocation] = useState('');
  const [localEvents, setLocalEvents] = useState(events); const [flash, setFlash] = useState(false);
  const handleCreate = () => {
    if (name && date && location) {
      setLocalEvents([...localEvents, { id: localEvents.length + 1, name, date, location, status: 'Đang chuẩn bị', approved: false, progress: 0 }]);
      setName(''); setDate(''); setLocation('');
      setFlash(true); setTimeout(() => setFlash(false), 2000);
    }
  };
  const ok = name && date && location;
  return (
    <MainLayout role="manager">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #059669, #047857)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(5,150,105,0.25)" }}>✨</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Tạo sự kiện mới</h1>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "24px", alignItems: "start" }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "20px" }}>Thông tin sự kiện</div>
            {[["TÊN SỰ KIỆN", "Nhập tên sự kiện", name, setName], ["NGÀY (DD/MM/YYYY)", "01/01/2025", date, setDate], ["ĐỊA ĐIỂM", "Nhập địa điểm", location, setLocation]].map(([label, ph, val, set]) => (
              <div key={label} style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", color: "#6b7280", fontSize: "11px", fontWeight: 600, marginBottom: "7px", letterSpacing: "0.5px" }}>{label}</label>
                <input type="text" value={val} placeholder={ph} onChange={(e) => set(e.target.value)} style={inp} onFocus={focus} onBlur={blur} />
              </div>
            ))}
            {flash && <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", padding: "10px 13px", marginBottom: "14px", color: "#059669", fontSize: "13px" }}>✓ Sự kiện đã được tạo!</div>}
            <button onClick={handleCreate} disabled={!ok} style={{ width: "100%", background: ok ? "linear-gradient(135deg, #059669, #047857)" : "#e5e7eb", border: "none", borderRadius: "10px", padding: "12px", color: ok ? "#fff" : "#9ca3af", fontSize: "14px", fontWeight: 600, cursor: ok ? "pointer" : "not-allowed", fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: ok ? "0 4px 12px rgba(5,150,105,0.25)" : "none", transition: "all 0.2s" }}>
              + Tạo sự kiện
            </button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Danh sách sự kiện</span>
              <span style={{ background: "#eef2ff", color: "#6366f1", border: "1px solid #c7d2fe", borderRadius: "20px", padding: "2px 10px", fontSize: "12px", fontWeight: 600 }}>{localEvents.length}</span>
            </div>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {localEvents.map((ev, i) => (
                <div key={ev.id} style={{ padding: "14px 22px", borderBottom: i < localEvents.length - 1 ? "1px solid #f9fafb" : "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 500, color: "#111827", fontSize: "14px", marginBottom: "3px" }}>{ev.name}</div>
                    <div style={{ fontSize: "12px", color: "#9ca3af" }}>📅 {ev.date} &nbsp; 📍 {ev.location}</div>
                  </div>
                  <span style={{ background: "#fffbeb", color: "#d97706", border: "1px solid #fde68a", borderRadius: "6px", padding: "3px 8px", fontSize: "11px", fontWeight: 600 }}>{ev.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default CreateEvent;