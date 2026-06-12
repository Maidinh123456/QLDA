import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events, marketingContent } from '../../mockData';

const MarketingDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [step, setStep] = useState(0); // 0 = dashboard, 1 = event detail

  const handleEventSelect = (ev) => {
    setSelectedEvent(ev);
    setStep(1);
  };

  const handleEventBack = () => {
    setSelectedEvent(null);
    setStep(0);
  };

  return (
    <MainLayout role="marketing">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #db2777, #9333ea)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(219,39,119,0.25)" }}>📣</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Marketing Dashboard</h1>
          </div>
        </div>
        {step === 0 ? (
          <>
            {/* stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "16px", marginBottom: "28px" }}>
              {[{ label: "Sự kiện", value: events.length, icon: "🗓", color: "#6366f1" }, { label: "Nội dung", value: marketingContent.length, icon: "📝", color: "#db2777" }, { label: "Đã xuất bản", value: marketingContent.filter(c => c.status === "Published").length, icon: "🚀", color: "#059669" }].map(({ label, value, icon, color }) => (
                <div key={label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: "24px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "3px" }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* event list */}
            <div style={{ marginBottom: "28px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 600, margin: "0 0 12px 0", color: "#111827" }}>Danh sách sự kiện</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {events.map((ev) => (
                  <div key={ev.id} onClick={() => handleEventSelect(ev)} style={{ padding: "14px 22px", background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 500, color: "#111827", fontSize: "14px", marginBottom: "3px" }}>{ev.name}</div>
                      <div style={{ fontSize: "12px", color: "#9ca3af" }}>📅 {ev.date} &nbsp; 📍 {ev.location}</div>
                    </div>
                    <div style={{ fontSize: "12px", color: "#6366f1" }}>›</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}

        {step === 1 && selectedEvent && (
          <div style={{ marginTop: "24px", background: "#fff", padding: "20px", border: "1px solid #e5e7eb", borderRadius: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <button onClick={handleEventBack} style={{ marginBottom: "16px", background: "none", border: "none", color: "#6366f1", cursor: "pointer" }}>← Quay lại danh sách</button>
            <h2 style={{ marginTop: 0, fontSize: "18px", color: "#111827" }}>Chi tiết sự kiện</h2>
            <div style={{ fontSize: "14px", color: "#111827", lineHeight: 1.5 }}>
              <p><strong>Tên:</strong> {selectedEvent.name}</p>
              <p><strong>Ngày:</strong> {selectedEvent.date}</p>
              <p><strong>Địa điểm:</strong> {selectedEvent.location}</p>
              <p><strong>Diễn giả:</strong> {selectedEvent.speaker}</p>
              <p><strong>Ngân sách:</strong> {selectedEvent.budget}</p>
              <p><strong>Giá vé:</strong> {selectedEvent.price}</p>
              <p><strong>Trạng thái:</strong> {selectedEvent.status}</p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
export default MarketingDashboard;