import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events, marketingContent } from '../../mockData';

const MarketingContent = () => {
  const [localContent, setLocalContent] = useState(marketingContent);
  const [form, setForm] = useState({ eventId: '', title: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [flash, setFlash] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.eventId || !form.title.trim()) return;

    if (editingId) {
      setLocalContent(localContent.map(c => c.id === editingId ? { ...c, ...form } : c));
      setEditingId(null);
    } else {
      const newItem = {
        id: localContent.length ? Math.max(...localContent.map(c => c.id)) + 1 : 1,
        eventId: parseInt(form.eventId),
        title: form.title,
        content: form.content,
        status: 'New'
      };
      setLocalContent([...localContent, newItem]);
      setFlash(true);
      setTimeout(() => setFlash(false), 2000);
    }

    setForm({ eventId: '', title: '', content: '' });
  };

  const handleEdit = (item) => {
    setForm({ eventId: item.eventId, title: item.title, content: item.content || '' });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isValid = form.eventId && form.title.trim();

  return (
    <MainLayout role="marketing">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #db2777, #9333ea)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(219,39,119,0.25)" }}>✍️</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Tạo nội dung marketing</h1>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: "24px", alignItems: "start" }}>
          {/* FORM */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "16px" }}>
              {editingId ? 'Chỉnh sửa nội dung' : 'Nội dung mới'}
            </div>

            {/* Chọn sự kiện */}
            <label style={{ display: "block", color: "#6b7280", fontSize: "11px", fontWeight: 600, marginBottom: "7px", letterSpacing: "0.5px" }}>SỰ KIỆN</label>
            <select
              name="eventId"
              value={form.eventId}
              onChange={handleChange}
              style={{ width: "100%", boxSizing: "border-box", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "10px 13px", color: form.eventId ? "#111827" : "#9ca3af", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "14px", cursor: "pointer" }}
              onFocus={(e) => { e.target.style.borderColor = "#db2777"; e.target.style.boxShadow = "0 0 0 3px rgba(219,39,119,0.1)"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }}
            >
              <option value="">-- Chọn sự kiện --</option>
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.name}</option>
              ))}
            </select>

            {/* Tiêu đề */}
            <label style={{ display: "block", color: "#6b7280", fontSize: "11px", fontWeight: 600, marginBottom: "7px", letterSpacing: "0.5px" }}>TIÊU ĐỀ</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Nhập tiêu đề bài truyền thông..."
              style={{ width: "100%", boxSizing: "border-box", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "10px 13px", color: "#111827", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "14px" }}
              onFocus={(e) => { e.target.style.borderColor = "#db2777"; e.target.style.boxShadow = "0 0 0 3px rgba(219,39,119,0.1)"; e.target.style.background = "#fff"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }}
            />

            {/* Nội dung */}
            <label style={{ display: "block", color: "#6b7280", fontSize: "11px", fontWeight: 600, marginBottom: "7px", letterSpacing: "0.5px" }}>NỘI DUNG</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Nhập nội dung bài truyền thông..."
              rows={5}
              style={{ width: "100%", boxSizing: "border-box", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "12px 13px", color: "#111827", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", resize: "vertical", lineHeight: 1.6, marginBottom: "14px" }}
              onFocus={(e) => { e.target.style.borderColor = "#db2777"; e.target.style.boxShadow = "0 0 0 3px rgba(219,39,119,0.1)"; e.target.style.background = "#fff"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }}
            />

            {flash && (
              <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", padding: "10px 13px", marginBottom: "12px", color: "#059669", fontSize: "13px" }}>
                ✓ Nội dung đã được tạo!
              </div>
            )}

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                style={{ flex: 1, background: isValid ? "linear-gradient(135deg, #db2777, #9333ea)" : "#e5e7eb", border: "none", borderRadius: "10px", padding: "12px", color: isValid ? "#fff" : "#9ca3af", fontSize: "14px", fontWeight: 600, cursor: isValid ? "pointer" : "not-allowed", fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: isValid ? "0 4px 12px rgba(219,39,119,0.25)" : "none" }}
              >
                {editingId ? '💾 Cập nhật' : '🚀 Tạo nội dung'}
              </button>
              {editingId && (
                <button
                  onClick={() => { setEditingId(null); setForm({ eventId: '', title: '', content: '' }); }}
                  style={{ background: "#f3f4f6", border: "none", borderRadius: "10px", padding: "12px 16px", color: "#6b7280", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Hủy
                </button>
              )}
            </div>
          </div>

          {/* DANH SÁCH */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Danh sách nội dung</span>
              <span style={{ background: "#fdf2f8", color: "#db2777", border: "1px solid #f9a8d4", borderRadius: "20px", padding: "2px 10px", fontSize: "12px", fontWeight: 600 }}>{localContent.length}</span>
            </div>

            {localContent.length === 0 && (
              <div style={{ padding: "32px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>Chưa có nội dung nào</div>
            )}

            {localContent.map((c, i) => {
              const ev = events.find(e => e.id === c.eventId);
              return (
                <div key={c.id} style={{ padding: "16px 22px", borderBottom: i < localContent.length - 1 ? "1px solid #f3f4f6" : "none", background: editingId === c.id ? "#fdf2f8" : "transparent" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{ flex: 1 }}>
                      {ev && <div style={{ fontSize: "11px", color: "#db2777", fontWeight: 600, marginBottom: "4px" }}>📅 {ev.name}</div>}
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "4px" }}>{c.title}</div>
                      {c.content && <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.5, marginBottom: "10px" }}>{c.content}</div>}
                      <button
                        onClick={() => handleEdit(c)}
                        style={{ fontSize: "12px", color: "#374151", background: "#fff", border: "1px solid #d1d5db", borderRadius: "6px", padding: "5px 14px", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
                      >
                        Chỉnh sửa
                      </button>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: c.status === "Published" ? "#059669" : "#6366f1", background: c.status === "Published" ? "#ecfdf5" : "#eef2ff", border: `1px solid ${c.status === "Published" ? "#a7f3d0" : "#c7d2fe"}`, borderRadius: "5px", padding: "2px 8px", whiteSpace: "nowrap", flexShrink: 0 }}>{c.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MarketingContent;