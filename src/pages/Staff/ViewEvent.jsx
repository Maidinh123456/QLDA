import React, { useMemo, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events } from '../../mockData';

const statusConfig = {
  "Đang chuẩn bị": { c: "#d97706", bg: "#fffbeb", b: "#fde68a" },
  "Đang triển khai": { c: "#2563eb", bg: "#eff6ff", b: "#bfdbfe" },
  "Đang diễn ra": { c: "#059669", bg: "#ecfdf5", b: "#a7f3d0" },
  "Chờ phê duyệt": { c: "#9ca3af", bg: "#f3f4f6", b: "#e5e7eb" },
  "Chưa bắt đầu": { c: "#f97316", bg: "#fff7ed", b: "#fed7aa" },
  "Hoàn thành": { c: "#6366f1", bg: "#eef2ff", b: "#c7d2fe" },
};

const ViewEvent = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredEvents = useMemo(() => {
    const key = search.trim().toLowerCase();
    return events.filter((ev) => {
      const matchSearch = !key || ev.name.toLowerCase().includes(key) || ev.client.toLowerCase().includes(key);
      const matchStatus = statusFilter ? ev.status === statusFilter : true;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  return (
    <MainLayout role="staff">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "26px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(99,102,241,0.25)" }}>🗓</div>
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Xem thông tin sự kiện</h1>
              <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "3px" }}>Tổng quan tiến độ, khách hàng và ngân sách</div>
            </div>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "18px", marginBottom: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "12px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm theo tên sự kiện hoặc khách hàng..." style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "10px 12px", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", outline: "none" }}
              onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; e.target.style.background = "#fff"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }} />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "10px 12px", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <option value="">Tất cả trạng thái</option>
              {Object.keys(statusConfig).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filteredEvents.map((ev) => {
            const cfg = statusConfig[ev.status] || statusConfig["Đang chuẩn bị"];
            return (
              <div key={ev.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ background: cfg.bg, borderBottom: `1px solid ${cfg.b}`, padding: "16px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <div>
                    <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111827", margin: 0 }}>{ev.name}</h2>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "3px" }}>Khách hàng: {ev.client}</div>
                  </div>
                  <span style={{ background: "rgba(255,255,255,0.8)", color: cfg.c, border: `1px solid ${cfg.b}`, borderRadius: "6px", padding: "3px 10px", fontSize: "12px", fontWeight: 600 }}>{ev.status}</span>
                </div>
                <div style={{ padding: "16px 22px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "14px" }}>
                  {[["Ngày", ev.date, "📅"], ["Địa điểm", ev.location, "📍"], ["Diễn giả", ev.speaker, "🎤"], ["Ngân sách", `${ev.budget.toLocaleString()} VNĐ`, "💰"], ["Tham dự", `${ev.participants} người`, "👥"], ["Bán vé", `${ev.ticketsSold} vé`, "🎫"], ["Tiến độ", `${ev.progress}%`, "📊"], ["Phê duyệt", ev.approved ? "Đã duyệt" : "Chưa duyệt", ev.approved ? "✅" : "⏳"]].map(([label, value, icon]) => (
                    <div key={label}>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{icon} {label}</div>
                      <div style={{ fontSize: "14px", color: "#111827", fontWeight: 500 }}>{value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "0 22px 16px" }}>
                  <div style={{ background: "#f3f4f6", borderRadius: "4px", height: "6px" }}>
                    <div style={{ width: `${ev.progress}%`, height: "100%", background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: "4px" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default ViewEvent;
