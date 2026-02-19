import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events } from '../../mockData';
const SearchEvent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const handleSearch = () => { setResults(events.filter(ev => ev.name.toLowerCase().includes(query.toLowerCase()) || ev.location.toLowerCase().includes(query.toLowerCase()))); setSearched(true); };
  const statusCfg = { "Đang chuẩn bị": { c: "#d97706", bg: "#fffbeb", b: "#fde68a" }, "Đang diễn ra": { c: "#059669", bg: "#ecfdf5", b: "#a7f3d0" }, "Hoàn thành": { c: "#6366f1", bg: "#eef2ff", b: "#c7d2fe" } };
  const list = searched ? results : events;
  return (
    <MainLayout role="participant">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #0891b2, #6366f1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(8,145,178,0.25)" }}>🔍</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Tìm kiếm sự kiện</h1>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
          <input type="text" value={query} placeholder="Tìm theo tên hoặc địa điểm..." onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            style={{ flex: 1, background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: "12px", padding: "13px 16px", color: "#111827", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
            onFocus={(e) => { e.target.style.borderColor = "#0891b2"; e.target.style.boxShadow = "0 0 0 3px rgba(8,145,178,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)"; }} />
          <button onClick={handleSearch} style={{ background: "linear-gradient(135deg, #0891b2, #6366f1)", border: "none", borderRadius: "12px", padding: "13px 22px", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: "0 4px 12px rgba(8,145,178,0.25)", whiteSpace: "nowrap" }}>🔍 Tìm</button>
        </div>
        {searched && results.length === 0 ? (
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "48px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}><div style={{ fontSize: "36px", marginBottom: "10px" }}>🔎</div><p style={{ color: "#9ca3af", margin: 0 }}>Không tìm thấy sự kiện phù hợp.</p></div>
        ) : (
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "15px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}><span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>{searched ? `Kết quả (${results.length})` : "Tất cả sự kiện"}</span></div>
            {list.map((ev, i) => {
              const sc = statusCfg[ev.status] || statusCfg["Đang chuẩn bị"];
              return (
                <div key={ev.id} style={{ padding: "15px 22px", borderBottom: i < list.length - 1 ? "1px solid #f9fafb" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", transition: "background 0.15s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <div><div style={{ fontWeight: 500, color: "#111827", marginBottom: "3px" }}>{ev.name}</div><div style={{ fontSize: "12px", color: "#9ca3af" }}>📅 {ev.date} &nbsp; 📍 {ev.location}</div></div>
                  <span style={{ background: sc.bg, color: sc.c, border: `1px solid ${sc.b}`, borderRadius: "6px", padding: "3px 9px", fontSize: "11px", fontWeight: 600, whiteSpace: "nowrap" }}>{ev.status}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
};
export default SearchEvent;