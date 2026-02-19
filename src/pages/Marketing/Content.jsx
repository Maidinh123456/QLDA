import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { marketingContent } from '../../mockData';

const MarketingContent = () => {
  const [content, setContent] = useState('');
  const [localContent, setLocalContent] = useState(marketingContent);
  const [flash, setFlash] = useState(false);
  const handleCreate = () => {
    if (!content.trim()) return;
    setLocalContent([...localContent, { id: localContent.length + 1, eventId: 1, title: content, status: 'New' }]);
    setContent(''); setFlash(true); setTimeout(() => setFlash(false), 2000);
  };
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
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "16px" }}>Nội dung mới</div>
            <label style={{ display: "block", color: "#6b7280", fontSize: "11px", fontWeight: 600, marginBottom: "7px", letterSpacing: "0.5px" }}>TIÊU ĐỀ / NỘI DUNG</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Nhập tiêu đề hoặc nội dung marketing..." style={{ width: "100%", boxSizing: "border-box", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "12px 13px", color: "#111827", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "120px", resize: "vertical", lineHeight: 1.6, marginBottom: "14px" }}
              onFocus={(e) => { e.target.style.borderColor = "#db2777"; e.target.style.boxShadow = "0 0 0 3px rgba(219,39,119,0.1)"; e.target.style.background = "#fff"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }} />
            {flash && <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", padding: "10px 13px", marginBottom: "12px", color: "#059669", fontSize: "13px" }}>✓ Nội dung đã được tạo!</div>}
            <button onClick={handleCreate} disabled={!content.trim()} style={{ width: "100%", background: content.trim() ? "linear-gradient(135deg, #db2777, #9333ea)" : "#e5e7eb", border: "none", borderRadius: "10px", padding: "12px", color: content.trim() ? "#fff" : "#9ca3af", fontSize: "14px", fontWeight: 600, cursor: content.trim() ? "pointer" : "not-allowed", fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: content.trim() ? "0 4px 12px rgba(219,39,119,0.25)" : "none" }}>
              🚀 Tạo nội dung
            </button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>Danh sách nội dung</span>
              <span style={{ background: "#fdf2f8", color: "#db2777", border: "1px solid #f9a8d4", borderRadius: "20px", padding: "2px 10px", fontSize: "12px", fontWeight: 600 }}>{localContent.length}</span>
            </div>
            {localContent.map((c, i) => (
              <div key={c.id} style={{ padding: "14px 22px", borderBottom: i < localContent.length - 1 ? "1px solid #f9fafb" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: "14px", color: "#111827" }}>{c.title}</div>
                <span style={{ fontSize: "11px", fontWeight: 600, color: c.status === "Published" ? "#059669" : "#6366f1", background: c.status === "Published" ? "#ecfdf5" : "#eef2ff", border: `1px solid ${c.status === "Published" ? "#a7f3d0" : "#c7d2fe"}`, borderRadius: "5px", padding: "2px 8px", whiteSpace: "nowrap" }}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default MarketingContent;