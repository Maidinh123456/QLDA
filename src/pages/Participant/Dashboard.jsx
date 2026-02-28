import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { tickets, notifications, surveys, events } from '../../mockData';

const allowedStatus = ["Đang chuẩn bị", "Đang diễn ra", "Hoàn thành"];

const statusCfg = {
  "Đang chuẩn bị": { c: "#7C3AED", bg: "#EDE9FE", b: "#C4B5FD", dot: "#7C3AED" },
  "Đang diễn ra":  { c: "#059669", bg: "#D1FAE5", b: "#6EE7B7", dot: "#10B981" },
  "Hoàn thành":    { c: "#2563EB", bg: "#DBEAFE", b: "#93C5FD", dot: "#3B82F6" },
};

const visibleEvents = events.filter(ev => allowedStatus.includes(ev.status));

// ── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, color }) => (
  <div style={{
    background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14,
    padding: "16px 18px", display: "flex", alignItems: "center", gap: 12,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
  }}>
    <div style={{
      width: 40, height: 40, borderRadius: 10,
      background: color + "18", display: "flex",
      alignItems: "center", justifyContent: "center", fontSize: 18
    }}>{icon}</div>
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#111827", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3 }}>{label}</div>
    </div>
  </div>
);

// ── EVENT ROW (same style as SearchEvent) ────────────────────────────────────
const EventRow = ({ ev, isSelected, onClick }) => {
  const sc = statusCfg[ev.status] || statusCfg["Đang chuẩn bị"];
  return (
    <div
      onClick={() => onClick(ev)}
      style={{
        padding: "14px 18px", cursor: "pointer",
        borderBottom: "1px solid #f8fafc",
        borderLeft: isSelected ? "3px solid #6366f1" : "3px solid transparent",
        background: isSelected ? "#f5f3ff" : "#fff",
        transition: "all 0.15s",
      }}
      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#fafbff"; }}
      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "#fff"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: 600, fontSize: 14, color: "#1e293b",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
          }}>{ev.name}</div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, display: "flex", gap: 10 }}>
            <span>📅 {ev.date}</span>
            <span>📍 {ev.location}</span>
          </div>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
          whiteSpace: "nowrap", flexShrink: 0,
          color: sc.c, background: sc.bg, border: `1px solid ${sc.b}`
        }}>
          <span style={{
            display: "inline-block", width: 6, height: 6, borderRadius: "50%",
            background: sc.dot, marginRight: 5, verticalAlign: "middle"
          }} />
          {ev.status}
        </span>
      </div>
    </div>
  );
};

// ── DETAIL PANEL ─────────────────────────────────────────────────────────────
const DetailRow = ({ icon, label, value }) => (
  <div style={{
    display: "flex", alignItems: "flex-start", gap: 12,
    padding: "11px 0", borderBottom: "1px solid #f1f5f9"
  }}>
    <span style={{ fontSize: 15, minWidth: 22, textAlign: "center" }}>{icon}</span>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, color: "#1e293b", fontWeight: 500 }}>{value ?? "—"}</div>
    </div>
  </div>
);

const DetailPanel = ({ ev, onClose }) => {
  const sc = statusCfg[ev.status] || statusCfg["Đang chuẩn bị"];
  const progress = ev.progress ?? 0;
  return (
    <div style={{
      flex: 1, background: "#fff", borderRadius: 16,
      border: "1px solid #e2e8f0", boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
      overflow: "hidden", display: "flex", flexDirection: "column",
      animation: "slideIn 0.2s ease"
    }}>
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateX(14px); } to { opacity:1; transform:translateX(0); } }`}</style>

      {/* Header */}
      <div style={{
        padding: "18px 22px 14px",
        borderBottom: "1px solid #f1f5f9",
        background: "linear-gradient(135deg, #f8faff 0%, #faf5ff 100%)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#6366f1", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>Chi tiết sự kiện</div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#1e293b", lineHeight: 1.3 }}>{ev.name}</h3>
          </div>
          <button onClick={onClose} style={{
            background: "#f1f5f9", border: "none", borderRadius: 8,
            width: 30, height: 30, cursor: "pointer", fontSize: 14,
            color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center"
          }}>✕</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
            color: sc.c, background: sc.bg, border: `1px solid ${sc.b}`
          }}>
            <span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:sc.dot, marginRight:5, verticalAlign:"middle" }} />
            {ev.status}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 10, color: "#94a3b8" }}>Tiến độ</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: sc.c }}>{progress}%</span>
            </div>
            <div style={{ height: 5, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 4, width: `${progress}%`,
                background: `linear-gradient(90deg, ${sc.dot}, ${sc.c})`,
                transition: "width 0.5s ease"
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #f1f5f9" }}>
        {[
          { label: "Tham dự", value: ev.participants?.toLocaleString() ?? "—", icon: "👥" },
          { label: "Vé bán", value: ev.ticketsSold?.toLocaleString() ?? "—", icon: "🎟️" },
          { label: "Ngân sách", value: ev.budget ?? "—", icon: "💰" },
        ].map((s, i) => (
          <div key={i} style={{
            padding: "12px 10px", textAlign: "center",
            borderRight: i < 2 ? "1px solid #f1f5f9" : "none"
          }}>
            <div style={{ fontSize: 18, marginBottom: 3 }}>{s.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Rows */}
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 20px 16px" }}>
        <DetailRow icon="🆔" label="Mã sự kiện" value={ev.id} />
        <DetailRow icon="🏢" label="Khách hàng" value={ev.client} />
        <DetailRow icon="📅" label="Ngày tổ chức" value={ev.date} />
        <DetailRow icon="📍" label="Địa điểm" value={ev.location} />
        <DetailRow icon="🎤" label="Diễn giả" value={ev.speaker} />
      </div>
    </div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const ParticipantDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (ev) => {
    setSelectedEvent(prev => prev?.id === ev.id ? null : ev);
  };

  return (
    <MainLayout role="participant">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>

        {/* ── PAGE TITLE */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40,
              background: "linear-gradient(135deg, #0891b2, #6366f1)",
              borderRadius: 10, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 18,
              boxShadow: "0 4px 12px rgba(8,145,178,0.25)"
            }}>🎟</div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 }}>Trang chủ</h1>
          </div>
        </div>

        {/* ── STAT CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 24 }}>
          <StatCard icon="🎟" label="Vé của tôi"  value={tickets.length}                        color="#0891b2" />
          <StatCard icon="💳" label="Chưa TT"     value={tickets.filter(t => !t.paid).length}   color="#d97706" />
          <StatCard icon="🔔" label="Thông báo"   value={notifications.length}                  color="#8b5cf6" />
          <StatCard icon="📋" label="Khảo sát"    value={surveys.length}                        color="#059669" />
        </div>

        {/* ── MAIN GRID */}
        <div style={{ display: "grid", gridTemplateColumns: selectedEvent ? "1fr 1fr" : "1fr", gap: 20, alignItems: "start" }}>

          {/* LEFT COL */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* ── SỰ KIỆN (styled same as SearchEvent) */}
            <div style={{
              background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16,
              boxShadow: "0 1px 6px rgba(0,0,0,0.05)", overflow: "hidden"
            }}>
              <div style={{
                padding: "14px 18px", borderBottom: "1px solid #f1f5f9",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>
                  📅 Sự kiện
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: "#6366f1",
                  background: "#eef2ff", borderRadius: 20, padding: "2px 10px"
                }}>{visibleEvents.length} sự kiện</span>
              </div>
              <div style={{ maxHeight: 340, overflowY: "auto" }}>
                {visibleEvents.map(ev => (
                  <EventRow
                    key={ev.id}
                    ev={ev}
                    isSelected={selectedEvent?.id === ev.id}
                    onClick={handleSelectEvent}
                  />
                ))}
              </div>
            </div>

            {/* ── VÉ + NOTI + SURVEY */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

              {/* Vé */}
              {/* Vé */}
<div style={{
  background: "#fff",
  borderRadius: 18,
  border: "1px solid #e5e7eb",
  boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
  overflow: "hidden"
}}>
  <div style={{
    padding: "14px 20px",
    borderBottom: "1px solid #f3f4f6",
    background: "linear-gradient(135deg,#f8fafc,#f1f5f9)"
  }}>
    <span style={{
      fontSize: 13,
      fontWeight: 700,
      color: "#475569",
      letterSpacing: "0.6px",
      textTransform: "uppercase"
    }}>
      🎟 Vé của tôi
    </span>
  </div>

  {tickets.map((t, i) => {
  const event = events.find(e => e.id === t.eventId);

  return (
    <div
      key={t.id}
      style={{
        padding: "16px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: i < tickets.length - 1 ? "1px solid #f1f5f9" : "none",
        transition: "all 0.2s"
      }}
      onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
      onMouseLeave={e => e.currentTarget.style.background = "#fff"}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 16
        }}>
          🎫
        </div>

        <div>
          <div style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#1e293b"
          }}>
            {event?.name || "Không tìm thấy sự kiện"}
          </div>

          <div style={{
            fontSize: 11,
            color: "#94a3b8",
            marginTop: 2
          }}>
            Vé tham dự sự kiện
          </div>
        </div>
      </div>

      <span
  style={{
    fontSize: 11,
    fontWeight: 700,
    padding: "6px 12px",
    borderRadius: 20,
    background: t.paid ? "#ecfdf5" : "#ffd4d4",
    color: t.paid ? "#059669" : "#de3b3b",
    border: t.paid
      ? "1px solid #a7f3d0"
      : "1px solid #ffac9d"
  }}
>
  {t.paid ? "✔ Đã thanh toán" : "✖ Chưa thanh toán"}
</span>
    </div>
  );
})}
</div>
              {/* Noti + Survey stacked */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{
                  background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14,
                  overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                }}>
                  <div style={{ padding: "12px 18px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>🔔 Thông báo</span>
                  </div>
                  {notifications.map((n, i) => (
                    <div key={n.id} style={{
                      padding: "10px 18px", borderBottom: i < notifications.length - 1 ? "1px solid #f9fafb" : "none",
                      display: "flex", gap: 10, alignItems: "flex-start"
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8b5cf6", marginTop: 5, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#374151" }}>{n.message}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14,
                  overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                }}>
                  <div style={{ padding: "12px 18px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px" }}>📋 Khảo sát</span>
                  </div>
                  {surveys.map((s, i) => (
                    <div key={s.id} style={{
                      padding: "10px 18px", borderBottom: i < surveys.length - 1 ? "1px solid #f9fafb" : "none",
                      fontSize: 13, color: "#374151", fontStyle: "italic"
                    }}>"{s.feedback}"</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COL – detail panel */}
          {selectedEvent && (
            <DetailPanel ev={selectedEvent} onClose={() => setSelectedEvent(null)} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ParticipantDashboard;