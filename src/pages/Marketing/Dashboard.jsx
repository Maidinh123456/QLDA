import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events, marketingContent } from '../../mockData';

const statusCfg = { "New": { c: "#6366f1", bg: "#eef2ff", b: "#c7d2fe" }, "Published": { c: "#059669", bg: "#ecfdf5", b: "#a7f3d0" }, "Draft": { c: "#d97706", bg: "#fffbeb", b: "#fde68a" } };

const MarketingDashboard = () => {
  // --- local state for form, list, and selected event ---
  const [contents, setContents] = useState(marketingContent);
  const [form, setForm] = useState({ id: null, eventId: "", title: "", content: "" });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [step, setStep] = useState(0); // 0 = dashboard, 1 = event detail

  const handleChange = (e) => {
    const { name, value } = e.target;
    let v = value;
    if (name === "eventId") {
      v = value === "" ? "" : parseInt(value, 10);
    }
    setForm(prev => ({ ...prev, [name]: v }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.eventId || !form.title) return; // simple validation
    if (form.id != null) {
      // edit existing
      setContents(prev => prev.map(c => (c.id === form.id ? { ...c, ...form } : c)));
    } else {
      const nextId = contents.length ? Math.max(...contents.map(c => c.id)) + 1 : 1;
      setContents(prev => [...prev, { ...form, id: nextId, status: "New" }]);
    }
    setForm({ id: null, eventId: "", title: "", content: "" });
  };

  const handleEdit = (item) => {
    setForm({ ...item });
  };

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
              {[{ label: "Sự kiện", value: events.length, icon: "🗓", color: "#6366f1" }, { label: "Nội dung", value: contents.length, icon: "📝", color: "#db2777" }, { label: "Đã xuất bản", value: contents.filter(c => c.status === "Published").length, icon: "🚀", color: "#059669" }].map(({ label, value, icon, color }) => (
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
                {events.map((ev, i) => (
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

            {/* form and list */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ background: "#fff", padding: "20px", border: "1px solid #e5e7eb", borderRadius: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <h2 style={{ marginTop: 0, fontSize: "18px", color: "#111827" }}>Tạo / Chỉnh sửa nội dung</h2>
                <form onSubmit={handleSave}>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>Sự kiện</label>
                    <select name="eventId" value={form.eventId} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #d1d5db" }}>
                      <option value="">Chọn sự kiện</option>
                      {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>Tiêu đề</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #d1d5db" }}
                    />
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>Nội dung</label>
                    <textarea
                      name="content"
                      value={form.content}
                      onChange={handleChange}
                      rows={4}
                      style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #d1d5db" }}
                    />
                  </div>
                  <button type="submit" style={{ background: "#6366f1", color: "#fff", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}>
                    Lưu
                  </button>
                </form>
              </div>
              <div style={{ background: "#fff", padding: "20px", border: "1px solid #e5e7eb", borderRadius: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <h2 style={{ marginTop: 0, fontSize: "18px", color: "#111827" }}>Danh sách nội dung</h2>
                {contents.map(item => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
                    <span>{item.title}</span>
                    <button onClick={() => handleEdit(item)} style={{ fontSize: "12px", color: "#6366f1", background: "none", border: "none", cursor: "pointer" }}>
                      Chỉnh sửa
                    </button>
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
        )}      </div>
    </MainLayout>
  );
};
export default MarketingDashboard;