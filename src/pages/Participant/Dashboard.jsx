import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { tickets, notifications, surveys, events } from '../../mockData';

const allowedStatus = ["Đang chuẩn bị", "Đang diễn ra", "Hoàn thành"];

const statusCfg = {
  "Đang chuẩn bị": { c:"#7C3AED", bg:"#EDE9FE", b:"#C4B5FD", dot:"#7C3AED", rowBg:"#faf5ff", rowBorder:"#ddd6fe", leftBar:"#7C3AED" },
  "Đang diễn ra":  { c:"#059669", bg:"#D1FAE5", b:"#6EE7B7", dot:"#10B981", rowBg:"#f0fdf4", rowBorder:"#a7f3d0", leftBar:"#10B981" },
  "Hoàn thành":    { c:"#2563EB", bg:"#DBEAFE", b:"#93C5FD", dot:"#3B82F6", rowBg:"#eff6ff", rowBorder:"#bfdbfe", leftBar:"#3B82F6" },
};

const visibleEvents = events.filter(ev => allowedStatus.includes(ev.status));

/* ── STAT CARD ── */
const StatCard = ({ icon, label, value, from, to, shadow }) => (
  <div style={{
    background:"#fff", border:"1.5px solid #f1f5f9", borderRadius:16,
    padding:"16px 18px", display:"flex", alignItems:"center", gap:14,
    boxShadow:"0 2px 12px rgba(0,0,0,.05)",
    transition:"all .2s", cursor:"default"
  }}
    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${shadow}`; }}
    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)";   e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,.05)"; }}
  >
    <div style={{
      width:44, height:44, borderRadius:13, flexShrink:0,
      background:`linear-gradient(135deg,${from},${to})`,
      boxShadow:`0 6px 16px ${shadow}`,
      display:"flex", alignItems:"center", justifyContent:"center", fontSize:20
    }}>{icon}</div>
    <div>
      <div style={{ fontSize:24, fontWeight:900, color:"#0f172a", lineHeight:1, letterSpacing:"-.03em" }}>{value}</div>
      <div style={{ fontSize:11, fontWeight:600, color:"#94a3b8", marginTop:3, textTransform:"uppercase", letterSpacing:".06em" }}>{label}</div>
    </div>
  </div>
);

/* ── EVENT ROW — colored by status ── */
const EventRow = ({ ev, isSelected, onClick }) => {
  const sc = statusCfg[ev.status] || statusCfg["Đang chuẩn bị"];
  const [hovered, setHovered] = useState(false);
  const active = isSelected || hovered;
  return (
    <div
      onClick={() => onClick(ev)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding:"14px 18px", cursor:"pointer",
        borderBottom:"1px solid #f8fafc",
        borderLeft:`3px solid ${active ? sc.leftBar : "transparent"}`,
        background: active ? sc.rowBg : "#fff",
        transition:"all .18s",
      }}
    >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{
            fontWeight:700, fontSize:14, lineHeight:1.35,
            color: active ? sc.c : "#1e293b",
            whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
            transition:"color .18s"
          }}>{ev.name}</div>
          <div style={{ fontSize:12, color:"#94a3b8", marginTop:5, display:"flex", gap:12, flexWrap:"wrap" }}>
            <span>📅 {ev.date}</span>
            <span>📍 {ev.location}</span>
          </div>
        </div>
        <span style={{
          fontSize:11, fontWeight:700, padding:"4px 11px", borderRadius:20,
          whiteSpace:"nowrap", flexShrink:0,
          color:sc.c, background:sc.bg, border:`1.5px solid ${sc.b}`
        }}>
          <span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:sc.dot, marginRight:5, verticalAlign:"middle" }} />
          {ev.status}
        </span>
      </div>
    </div>
  );
};

/* ── DETAIL ROW ── */
const DetailRow = ({ icon, label, value }) => (
  <div style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"11px 0", borderBottom:"1px solid #f1f5f9" }}>
    <span style={{ fontSize:15, minWidth:22, textAlign:"center" }}>{icon}</span>
    <div style={{ flex:1, minWidth:0 }}>
      <div style={{ fontSize:10, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".06em", marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:13, color:"#1e293b", fontWeight:500 }}>{value ?? "—"}</div>
    </div>
  </div>
);

/* ── DETAIL PANEL ── */
const DetailPanel = ({ ev, onClose }) => {
  const sc = statusCfg[ev.status] || statusCfg["Đang chuẩn bị"];
  const progress = ev.progress ?? 0;
  return (
    <div style={{
      flex:1, background:"#fff", borderRadius:18,
      border:`1.5px solid ${sc.b}`,
      boxShadow:`0 4px 24px ${sc.rowBg}`,
      overflow:"hidden", display:"flex", flexDirection:"column",
      animation:"slideIn .2s ease"
    }}>
      <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:translateX(0)}}`}</style>

      {/* Header */}
      <div style={{ padding:"18px 22px 14px", borderBottom:"1px solid #f1f5f9", background:`linear-gradient(135deg,${sc.rowBg},#fff)` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:10, fontWeight:700, color:sc.c, letterSpacing:".08em", textTransform:"uppercase", marginBottom:5 }}>Chi tiết sự kiện</div>
            <h3 style={{ margin:0, fontSize:17, fontWeight:800, color:"#1e293b", lineHeight:1.3 }}>{ev.name}</h3>
          </div>
          <button onClick={onClose} style={{
            background:"#f1f5f9", border:"none", borderRadius:8,
            width:30, height:30, cursor:"pointer", fontSize:14,
            color:"#64748b", display:"flex", alignItems:"center", justifyContent:"center"
          }}>✕</button>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:10 }}>
          <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, color:sc.c, background:sc.bg, border:`1px solid ${sc.b}` }}>
            <span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:sc.dot, marginRight:5, verticalAlign:"middle" }} />
            {ev.status}
          </span>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <span style={{ fontSize:10, color:"#94a3b8" }}>Tiến độ</span>
              <span style={{ fontSize:10, fontWeight:700, color:sc.c }}>{progress}%</span>
            </div>
            <div style={{ height:6, background:"#e2e8f0", borderRadius:4, overflow:"hidden" }}>
              <div style={{ height:"100%", borderRadius:4, width:`${progress}%`, background:`linear-gradient(90deg,${sc.dot},${sc.c})`, transition:"width .5s ease" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderBottom:"1px solid #f1f5f9" }}>
        {[
          { label:"Tham dự", value:ev.participants?.toLocaleString() ?? "—", icon:"👥" },
          { label:"Vé bán",  value:ev.ticketsSold?.toLocaleString()  ?? "—", icon:"🎟️" },
          { label:"Ngân sách", value:ev.budget ?? "—", icon:"💰" },
        ].map((s, i) => (
          <div key={i} style={{ padding:"14px 10px", textAlign:"center", borderRight:i<2?"1px solid #f1f5f9":"none", background:i===0?`${sc.rowBg}44`:"#fff" }}>
            <div style={{ fontSize:18, marginBottom:4 }}>{s.icon}</div>
            <div style={{ fontSize:15, fontWeight:800, color:i===0?sc.c:"#1e293b" }}>{s.value}</div>
            <div style={{ fontSize:10, color:"#94a3b8", marginTop:2, fontWeight:600, textTransform:"uppercase", letterSpacing:".05em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Rows */}
      <div style={{ flex:1, overflowY:"auto", padding:"4px 20px 16px" }}>
        <DetailRow icon="🆔" label="Mã sự kiện"  value={ev.id} />
        <DetailRow icon="🏢" label="Khách hàng"  value={ev.client} />
        <DetailRow icon="📅" label="Ngày tổ chức" value={ev.date} />
        <DetailRow icon="📍" label="Địa điểm"    value={ev.location} />
        <DetailRow icon="🎤" label="Diễn giả"    value={ev.speaker} />
      </div>
    </div>
  );
};

/* ── SECTION HEADER ── */
const SectionHead = ({ icon, title, count, color }) => (
  <div style={{ padding:"13px 18px", borderBottom:"1px solid #f1f5f9", display:"flex", justifyContent:"space-between", alignItems:"center", background:"#fafafa" }}>
    <span style={{ fontSize:12, fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:".07em" }}>{icon} {title}</span>
    {count !== undefined && (
      <span style={{ fontSize:11, fontWeight:700, color:color||"#6366f1", background:`${color||"#6366f1"}15`, borderRadius:20, padding:"2px 10px" }}>
        {count}
      </span>
    )}
  </div>
);

/* ── MAIN ── */
const ParticipantDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (ev) => {
    setSelectedEvent(prev => prev?.id === ev.id ? null : ev);
  };

  return (
    <MainLayout role="participant">
      <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", color:"#0f172a", padding:"0 0 40px" }}>

        {/* PAGE TITLE */}
        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{
              width:48, height:48, borderRadius:14, flexShrink:0,
              background:"linear-gradient(135deg,#0891b2,#6366f1)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:22, boxShadow:"0 6px 18px rgba(8,145,178,.3)"
            }}>🎟</div>
            <div>
              <h1 style={{ fontSize:24, fontWeight:900, color:"#0f172a", margin:0, letterSpacing:"-.03em" }}>Participant Dashboard</h1>
              <p style={{ fontSize:13, color:"#94a3b8", margin:"3px 0 0", fontWeight:500 }}>Xin chào! Đây là tổng quan tài khoản của bạn</p>
            </div>
          </div>
        </div>

        {/* STAT CARDS */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:22 }}>
          <StatCard icon="🎟" label="Vé của tôi" value={tickets.length}                      from="#0891b2" to="#06b6d4" shadow="rgba(8,145,178,.2)"  />
          <StatCard icon="💳" label="Chưa TT"    value={tickets.filter(t=>!t.paid).length}   from="#f59e0b" to="#f97316" shadow="rgba(245,158,11,.2)" />
          <StatCard icon="🔔" label="Thông báo"  value={notifications.length}                from="#8b5cf6" to="#a855f7" shadow="rgba(139,92,246,.2)" />
          <StatCard icon="📋" label="Khảo sát"   value={surveys.length}                      from="#10b981" to="#059669" shadow="rgba(16,185,129,.2)" />
        </div>

        {/* MAIN GRID */}
        <div style={{ display:"grid", gridTemplateColumns:selectedEvent?"1fr 1fr":"1fr", gap:18, alignItems:"start" }}>

          {/* LEFT COL */}
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>

            {/* SỰ KIỆN */}
            <div style={{ background:"#fff", border:"1.5px solid #f1f5f9", borderRadius:18, overflow:"hidden", boxShadow:"0 2px 14px rgba(0,0,0,.05)" }}>
              <SectionHead icon="📅" title="Sự kiện" count={`${visibleEvents.length} sự kiện`} />
              <div style={{ maxHeight:320, overflowY:"auto" }}>
                {visibleEvents.map(ev => (
                  <EventRow key={ev.id} ev={ev} isSelected={selectedEvent?.id===ev.id} onClick={handleSelectEvent} />
                ))}
              </div>
            </div>

            {/* VÉ + NOTI + SURVEY */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>

              {/* Vé */}
              <div style={{ background:"#fff", borderRadius:18, border:"1.5px solid #f1f5f9", boxShadow:"0 2px 14px rgba(0,0,0,.05)", overflow:"hidden" }}>
                <SectionHead icon="🎟" title="Vé của tôi" color="#0891b2" />
                {tickets.map((t, i) => {
                  const event = events.find(e => e.id === t.eventId);
                  return (
                    <div key={t.id} style={{
                      padding:"13px 18px", display:"flex", justifyContent:"space-between", alignItems:"center",
                      borderBottom:i<tickets.length-1?"1px solid #f8fafc":"none", transition:"all .15s",
                      background:"#fff"
                    }}
                      onMouseEnter={e=>e.currentTarget.style.background="#f8fafc"}
                      onMouseLeave={e=>e.currentTarget.style.background="#fff"}
                    >
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:16, flexShrink:0 }}>🎫</div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, color:"#1e293b" }}>{event?.name || "—"}</div>
                          <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>Vé tham dự sự kiện</div>
                        </div>
                      </div>
                      <span style={{
                        fontSize:11, fontWeight:700, padding:"5px 11px", borderRadius:20, flexShrink:0,
                        background:t.paid?"#ecfdf5":"#fef2f2",
                        color:t.paid?"#059669":"#ef4444",
                        border:t.paid?"1px solid #a7f3d0":"1px solid #fecaca"
                      }}>
                        {t.paid ? "✔ Đã thanh toán" : "✖ Chưa thanh toán"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Noti + Survey */}
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

                <div style={{ background:"#fff", border:"1.5px solid #f1f5f9", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 10px rgba(0,0,0,.04)" }}>
                  <SectionHead icon="🔔" title="Thông báo" color="#8b5cf6" />
                  {notifications.map((n, i) => (
                    <div key={n.id} style={{
                      padding:"10px 18px", borderBottom:i<notifications.length-1?"1px solid #f8fafc":"none",
                      display:"flex", gap:10, alignItems:"flex-start"
                    }}>
                      <div style={{ width:6, height:6, borderRadius:"50%", background:"#8b5cf6", marginTop:5, flexShrink:0 }} />
                      <span style={{ fontSize:13, color:"#374151" }}>{n.message}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background:"#fff", border:"1.5px solid #f1f5f9", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 10px rgba(0,0,0,.04)" }}>
                  <SectionHead icon="📋" title="Khảo sát" color="#059669" />
                  {surveys.map((s, i) => (
                    <div key={s.id} style={{
                      padding:"10px 18px", borderBottom:i<surveys.length-1?"1px solid #f8fafc":"none",
                      fontSize:13, color:"#374151", fontStyle:"italic"
                    }}>"{s.feedback}"</div>
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT — Detail panel */}
          {selectedEvent && (
            <DetailPanel ev={selectedEvent} onClose={() => setSelectedEvent(null)} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ParticipantDashboard;