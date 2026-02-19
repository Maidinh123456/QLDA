import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { tasks, users, events } from '../../mockData';

const sel = { width: "100%", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: "11px 13px", color: "#111827", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer", boxSizing: "border-box" };
const inp = { ...sel, cursor: "text" };

const AssignTask = () => {
  const [task, setTask] = useState(''); const [staff, setStaff] = useState(''); const [event, setEvent] = useState('');
  const [localTasks, setLocalTasks] = useState(tasks); const [flash, setFlash] = useState(false);
  const staffUsers = users.filter(u => u.role === 'staff');
  const handleAssign = () => {
    if (task && staff && event) {
      setLocalTasks([...localTasks, { id: localTasks.length + 1, eventId: parseInt(event), staff, task, done: false }]);
      setTask(''); setStaff(''); setEvent('');
      setFlash(true); setTimeout(() => setFlash(false), 2000);
    }
  };
  const ok = task && staff && event;
  return (
    <MainLayout role="manager">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(99,102,241,0.25)" }}>⚡</div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", margin: 0 }}>Phân công nhiệm vụ</h1>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "24px", alignItems: "start" }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "18px" }}>Tạo nhiệm vụ mới</div>
            {[["SỰ KIỆN", event, setEvent, events, "Chọn sự kiện..."],["NHÂN VIÊN", staff, setStaff, staffUsers.map(u=>({id:u.id,name:u.name})), "Chọn nhân viên..."]].map(([label, val, set, opts, ph]) => (
              <div key={label} style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", color: "#6b7280", fontSize: "11px", fontWeight: 600, marginBottom: "7px", letterSpacing: "0.5px" }}>{label}</label>
                <select value={val} onChange={(e) => set(e.target.value)} style={sel}>
                  <option value="">{ph}</option>
                  {opts.map(o => <option key={o.id} value={label === "SỰ KIỆN" ? o.id : o.name}>{o.name}</option>)}
                </select>
              </div>
            ))}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", color: "#6b7280", fontSize: "11px", fontWeight: 600, marginBottom: "7px", letterSpacing: "0.5px" }}>NỘI DUNG NHIỆM VỤ</label>
              <input type="text" value={task} placeholder="Mô tả nhiệm vụ..." onChange={(e) => setTask(e.target.value)} style={inp}
                onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; e.target.style.background = "#fff"; }}
                onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }} />
            </div>
            {flash && <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", padding: "10px 13px", marginBottom: "14px", color: "#059669", fontSize: "13px" }}>✓ Nhiệm vụ đã được giao!</div>}
            <button onClick={handleAssign} disabled={!ok} style={{ width: "100%", background: ok ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#e5e7eb", border: "none", borderRadius: "10px", padding: "12px", color: ok ? "#fff" : "#9ca3af", fontSize: "14px", fontWeight: 600, cursor: ok ? "pointer" : "not-allowed", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              ⚡ Phân công
            </button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb", display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", flex: 1 }}>Tất cả nhiệm vụ</span>
              <span style={{ background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0", borderRadius: "20px", padding: "2px 9px", fontSize: "11px", fontWeight: 600 }}>{localTasks.filter(t=>t.done).length} xong</span>
              <span style={{ background: "#fffbeb", color: "#d97706", border: "1px solid #fde68a", borderRadius: "20px", padding: "2px 9px", fontSize: "11px", fontWeight: 600 }}>{localTasks.filter(t=>!t.done).length} đang làm</span>
            </div>
            <div style={{ maxHeight: "420px", overflowY: "auto" }}>
              {localTasks.map((t, i) => (
                <div key={t.id} style={{ padding: "13px 22px", borderBottom: i < localTasks.length - 1 ? "1px solid #f9fafb" : "none", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: t.done ? "#059669" : "#6366f1", flexShrink: 0, boxShadow: `0 0 0 3px ${t.done ? "rgba(5,150,105,0.15)" : "rgba(99,102,241,0.15)"}` }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", color: t.done ? "#9ca3af" : "#111827", textDecoration: t.done ? "line-through" : "none" }}>{t.task}</div>
                    <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>👤 {t.staff} · Event #{t.eventId}</div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: t.done ? "#059669" : "#d97706", background: t.done ? "#ecfdf5" : "#fffbeb", border: `1px solid ${t.done ? "#a7f3d0" : "#fde68a"}`, borderRadius: "5px", padding: "2px 8px" }}>{t.done ? "Xong" : "Đang làm"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default AssignTask;