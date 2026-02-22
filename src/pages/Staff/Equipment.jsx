import React, { useMemo, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { equipment, events } from '../../mockData';

const Equipment = () => {
  const [localEquipment, setLocalEquipment] = useState(equipment);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [search, setSearch] = useState('');
  const handleUpdate = (id, newStatus) => setLocalEquipment((prev) => prev.map((eq) => (eq.id === id ? { ...eq, status: newStatus } : eq)));
  const sc = {
    "Sẵn sàng": { c: "#059669", bg: "#ecfdf5", b: "#a7f3d0", dot: "#059669" },
    "Đang sử dụng": { c: "#d97706", bg: "#fffbeb", b: "#fde68a", dot: "#d97706" },
    "Hỏng": { c: "#dc2626", bg: "#fef2f2", b: "#fecaca", dot: "#dc2626" },
  };

  const filteredEquipment = useMemo(() => {
    const key = search.trim().toLowerCase();
    return localEquipment.filter((item) => {
      const matchEvent = selectedEventId ? item.eventId === Number(selectedEventId) : true;
      const matchSearch = !key || item.name.toLowerCase().includes(key);
      return matchEvent && matchSearch;
    });
  }, [localEquipment, search, selectedEventId]);

  return (
    <MainLayout role="staff">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #d97706, #b45309)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(217,119,6,0.25)" }}>🔧</div>
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Theo dõi vật tư - thiết bị</h1>
              <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "3px" }}>Cập nhật tình trạng thiết bị theo từng sự kiện</div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px", marginBottom: "22px" }}>
          {Object.entries(sc).map(([status, cfg]) => (
            <div key={status} style={{ background: cfg.bg, border: `1px solid ${cfg.b}`, borderRadius: "14px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>{filteredEquipment.filter((e) => e.status === status).length}</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>{status}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "18px", marginBottom: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "12px" }}>
            <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)} style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "10px 12px", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <option value="">Tất cả sự kiện</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>{ev.name}</option>
              ))}
            </select>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm thiết bị..." style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "10px 12px", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", outline: "none" }}
              onFocus={(e) => { e.target.style.borderColor = "#d97706"; e.target.style.boxShadow = "0 0 0 3px rgba(217,119,6,0.12)"; e.target.style.background = "#fff"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }} />
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ padding: "15px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Thiết bị ({filteredEquipment.length})</span>
          </div>
          {filteredEquipment.map((item, i) => {
            const cfg = sc[item.status] || sc["Sẵn sàng"];
            const eventName = events.find((ev) => ev.id === item.eventId)?.name || `Event #${item.eventId}`;
            return (
              <div key={item.id} style={{ padding: "15px 22px", borderBottom: i < filteredEquipment.length - 1 ? "1px solid #f9fafb" : "none", display: "grid", gridTemplateColumns: "1.3fr 1fr 140px", alignItems: "center", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: cfg.dot, boxShadow: `0 0 0 3px ${cfg.dot}33`, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, color: "#111827", fontSize: "14px" }}>{item.name}</div>
                    <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>{eventName}</div>
                  </div>
                </div>
                <span style={{ justifySelf: "start", background: cfg.bg, color: cfg.c, border: `1px solid ${cfg.b}`, borderRadius: "6px", padding: "2px 8px", fontSize: "11px", fontWeight: 600 }}>{item.status}</span>
                <select value={item.status} onChange={(e) => handleUpdate(item.id, e.target.value)} style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "8px", padding: "7px 10px", color: "#111827", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>
                  <option>Sẵn sàng</option>
                  <option>Đang sử dụng</option>
                  <option>Hỏng</option>
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
