import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events, reports } from '../../mockData';

const Report = () => {
  const [localReports, setLocalReports] = useState(reports);
  const [eventId, setEventId] = useState(events[0]?.id ? String(events[0].id) : '');
  const [result, setResult] = useState('Thành công');
  const [revenue, setRevenue] = useState('');
  const [summary, setSummary] = useState('');

  const handleExport = (format) => alert(`Xuất báo cáo ${format} — tính năng đang phát triển.`);

  const handleCreate = () => {
    if (!eventId || !summary.trim()) return;
    const eventName = events.find((ev) => ev.id === Number(eventId))?.name || `Event #${eventId}`;
    setLocalReports([
      ...localReports,
      { id: localReports.length + 1, eventId: Number(eventId), event: eventName, result, revenue: revenue || "Chưa cập nhật", summary },
    ]);
    setSummary('');
    setRevenue('');
  };

  return (
    <MainLayout role="staff">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #8b5cf6, #6366f1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(139,92,246,0.25)" }}>📊</div>
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Lập báo cáo tổng kết</h1>
              <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "3px" }}>Tổng hợp kết quả, doanh thu và ghi chú sự kiện</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "18px" }}>
          {[{ label: "📄 Xuất PDF", bg: "linear-gradient(135deg, #dc2626, #b91c1c)", glow: "rgba(220,38,38,0.25)" }, { label: "📊 Xuất Excel", bg: "linear-gradient(135deg, #059669, #047857)", glow: "rgba(5,150,105,0.25)" }].map(({ label, bg, glow }) => (
            <button key={label} onClick={() => handleExport(label)} style={{ background: bg, border: "none", borderRadius: "10px", padding: "10px 18px", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: `0 4px 12px ${glow}` }}>{label}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "18px", marginBottom: "22px" }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "12px" }}>Tạo báo cáo mới</div>
            <div style={{ display: "grid", gap: "10px" }}>
              <select value={eventId} onChange={(e) => setEventId(e.target.value)} style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "10px 12px", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>{ev.name}</option>
                ))}
              </select>
              <select value={result} onChange={(e) => setResult(e.target.value)} style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "10px 12px", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <option>Thành công</option>
                <option>Đạt kỳ vọng</option>
                <option>Chưa đạt</option>
              </select>
              <input value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="Doanh thu (VD: 200 triệu)" style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "10px 12px", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", outline: "none" }}
                onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; e.target.style.background = "#fff"; }}
                onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }} />
              <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Tóm tắt kết quả, các vấn đề phát sinh, ghi chú..." style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "12px 13px", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "120px", outline: "none", resize: "vertical" }}
                onFocus={(e) => { e.target.style.borderColor = "#8b5cf6"; e.target.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.12)"; e.target.style.background = "#fff"; }}
                onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }} />
              <button onClick={handleCreate} disabled={!summary.trim()} style={{ background: summary.trim() ? "linear-gradient(135deg, #8b5cf6, #6366f1)" : "#e5e7eb", border: "none", borderRadius: "10px", padding: "10px 12px", color: summary.trim() ? "#fff" : "#9ca3af", fontSize: "13px", fontWeight: 600, cursor: summary.trim() ? "pointer" : "not-allowed", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Lưu báo cáo</button>
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "12px" }}>Gợi ý nội dung</div>
            <div style={{ display: "grid", gap: "10px", fontSize: "13px", color: "#6b7280" }}>
              <div>• Tổng quan: số lượng tham dự, mức độ hài lòng.</div>
              <div>• Vật tư - thiết bị: tình trạng, sự cố.</div>
              <div>• Tài chính: doanh thu, chi phí phát sinh.</div>
              <div>• Kiến nghị: đề xuất cải thiện cho sự kiện sau.</div>
            </div>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ padding: "15px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Báo cáo hiện có</span>
          </div>
          {localReports.map((r, i) => (
            <div key={r.id} style={{ padding: "16px 22px", borderBottom: i < localReports.length - 1 ? "1px solid #f9fafb" : "none", display: "grid", gridTemplateColumns: "1.4fr 0.6fr 1fr", gap: "12px", alignItems: "center", transition: "background 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f9fafb"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <div>
                <div style={{ fontWeight: 600, color: "#111827", marginBottom: "4px" }}>{r.event || `Event #${r.eventId}`}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>Kết quả: {r.result}</div>
                {r.summary && <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>{r.summary}</div>}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#059669" }}>{r.revenue}</div>
                <div style={{ fontSize: "11px", color: "#9ca3af" }}>Doanh thu</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#6366f1", background: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: "6px", padding: "2px 8px" }}>Báo cáo #{r.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Report;
