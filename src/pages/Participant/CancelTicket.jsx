import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { tickets, events } from "../../mockData";

const fmt = (n) => Number(n)?.toLocaleString("vi-VN") + " ₫";

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

  .ct-root * { box-sizing: border-box; }
  .ct-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes overlayIn  { from{opacity:0} to{opacity:1} }
  @keyframes overlayOut { from{opacity:1} to{opacity:0} }
  @keyframes modalIn  { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes modalOut { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(0.92)} }

  /* ── LIST ROW ── */
  .ct-row {
    background: #fff;
    border: 1.5px solid #e0e7ff;
    border-radius: 18px;
    box-shadow: 0 2px 12px rgba(99,102,241,.06);
    cursor: pointer;
    transition: all .22s cubic-bezier(.4,0,.2,1);
    padding: 18px 22px;
    display: flex; align-items: center; gap: 16px;
  }
  .ct-row:hover {
    border-color: #a5b4fc;
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(99,102,241,.14);
  }
  .ct-row:hover .ct-arrow {
    background: #e0e7ff !important;
    border-color: #a5b4fc !important;
    color: #4f46e5 !important;
    transform: translateX(3px);
  }
  .ct-arrow { transition: all .2s; }

  /* ── CARD ── */
  .ct-card {
    background: #fff;
    border: 1.5px solid #e0e7ff;
    border-radius: 20px;
    box-shadow: 0 4px 24px rgba(99,102,241,.07);
    overflow: hidden;
  }

  /* ── BACK BTN ── */
  .ct-back {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; background: #fff;
    border: 1.5px solid #e0e7ff; border-radius: 12px;
    cursor: pointer; font-size: 13px; font-weight: 600; color: #6d5fa0;
    font-family: 'Outfit', sans-serif; transition: all .15s; align-self: flex-start;
  }
  .ct-back:hover { border-color: #a5b4fc; color: #4338ca; background: #f5f3ff; }

  /* ── INFO TILE ── */
  .ct-tile {
    background: #f4f5f7; border: 1px solid #eaecef;
    border-radius: 13px; padding: 12px 16px;
  }
  .ct-tile-label {
    font-size: 10px; font-weight: 700; color: #a094c0;
    text-transform: uppercase; letter-spacing: .07em; margin-bottom: 5px;
  }
  .ct-tile-value { font-size: 14px; font-weight: 700; color: #0f172a; line-height: 1.35; }

  /* ── ACTION BTN ── */
  .ct-btn {
    width: 100%; padding: 15px; border-radius: 14px; border: none;
    font-size: 14px; font-weight: 700; font-family: 'Outfit', sans-serif;
    cursor: pointer; transition: all .2s;
  }
  .ct-btn.enabled {
    background: linear-gradient(135deg, #818cf8, #a78bfa, #c084fc);
    color: #fff; box-shadow: 0 4px 16px rgba(129,140,248,.35);
  }
  .ct-btn.enabled:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(129,140,248,.45); }
  .ct-btn.disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }

  /* ── MODAL ── */
  .ct-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(17,24,39,.4); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    animation: overlayIn .25s ease forwards;
  }
  .ct-overlay.hide { animation: overlayOut .25s ease forwards; }
  .ct-modal {
    background: #fff; border-radius: 24px; padding: 40px 36px 32px;
    text-align: center; max-width: 360px; width: 90%;
    box-shadow: 0 24px 64px rgba(0,0,0,.18);
    animation: modalIn .35s cubic-bezier(.34,1.56,.64,1) forwards;
  }
  .ct-overlay.hide .ct-modal { animation: modalOut .25s ease forwards; }
  .ct-modal-circle {
    width: 72px; height: 72px; border-radius: 50%;
    background: #eef2ff; border: 2px solid #a5b4fc;
    display: flex; align-items: center; justify-content: center;
    font-size: 32px; margin: 0 auto 20px;
  }
  .ct-modal-title { font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 24px; font-family: 'Outfit', sans-serif; }
  .ct-modal-btn {
    padding: 12px 32px;
    background: linear-gradient(135deg, #818cf8, #a78bfa, #c084fc);
    color: #fff; border: none; border-radius: 12px;
    font-size: 14px; font-weight: 700; font-family: 'Outfit', sans-serif;
    cursor: pointer; transition: all .2s;
    box-shadow: 0 4px 14px rgba(129,140,248,.3);
  }
  .ct-modal-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(129,140,248,.4); }

  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 700;
    padding: 4px 12px; border-radius: 99px; border: 1px solid; white-space: nowrap;
  }
  .pill-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
`;

const STATUS = {
  can:    { color:"#059669", bg:"#ecfdf5", border:"#a7f3d0", dot:"#10b981", label:"Có thể hủy" },
  cannot: { color:"#de3b3b", bg:"#ffd4d4", border:"#ffac9d", dot:"#de3b3b", label:"Không thể hủy" },
};
const CAN_CANCEL_STATUSES = ["Đang chuẩn bị", "Chờ phê duyệt"];

const Tile = ({ icon, label, value }) => (
  <div className="ct-tile">
    <div className="ct-tile-label">{icon} {label}</div>
    <div className="ct-tile-value">{value || "—"}</div>
  </div>
);

export default function CancelTicket() {
  const currentUserId = 4;

  const userTickets = tickets
    .filter(t => t.participantId === currentUserId)
    .map(t => {
      const event = events.find(e => e.id === t.eventId);
      return { ...t, eventData: event, canCancel: CAN_CANCEL_STATUSES.includes(event?.status) };
    });

  const [localTickets, setLocalTickets] = useState(userTickets);
  const [step,     setStep]     = useState(0);
  const [selected, setSelected] = useState(null);
  const [modal,    setModal]    = useState(null);

  const handleSelect = t => { setSelected(t); setStep(1); };
  const handleBack   = ()  => { setStep(0); setSelected(null); };

  const dismissModal = () => {
    setModal(prev => prev ? { ...prev, hiding: true } : null);
    setTimeout(() => setModal(null), 280);
  };

  const handleCancel = () => {
    if (!selected?.canCancel) return;
    setLocalTickets(prev => prev.filter(t => t.id !== selected.id));
    handleBack();
    setModal({ hiding: false });
  };

  return (
    <MainLayout role="participant">
      <style>{G}</style>
      <div className="ct-root" style={{ padding:"4px 0 40px" }}>

        {/* HEADER */}
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32, animation:"fadeUp .35s ease" }}>
          <div style={{
            width:54, height:54, borderRadius:16, flexShrink:0,
            background:"linear-gradient(135deg,#a5b4fc,#818cf8,#c084fc)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:24, boxShadow:"0 8px 24px rgba(129,140,248,.35)"
          }}>🎟️</div>
          <div>
            <h1 style={{ fontSize:26, fontWeight:900, margin:0, letterSpacing:"-.03em", color:"#0f172a" }}>Hủy vé</h1>
            <p style={{ fontSize:14, color:"#94a3b8", margin:"4px 0 0", fontWeight:500 }}>
              Chọn vé bạn muốn hủy
            </p>
          </div>
        </div>

        {/* ── STEP 0: LIST ── */}
        {step === 0 && (
          <div style={{ display:"flex", flexDirection:"column", gap:10, animation:"fadeUp .3s ease" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".09em", marginBottom:6 }}>
              Danh sách vé ({localTickets.length})
            </div>
            {localTickets.map((t, i) => {
              const sc = t.canCancel ? STATUS.can : STATUS.cannot;
              return (
                <div key={t.id} className="ct-row"
                  onClick={() => handleSelect(t)}
                  style={{ animation:`fadeUp .3s ease ${i*.08}s both` }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:15, fontWeight:800, color:"#0f172a", marginBottom:6 }}>
                      {t.eventData?.name}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#94a3b8", fontWeight:500 }}>
                      <span>📅 {t.eventData?.date}</span>
                      <span style={{ width:3, height:3, borderRadius:"50%", background:"#cbd5e1", display:"inline-block", flexShrink:0 }}/>
                      <span>📍 {t.eventData?.location}</span>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                    <span className="pill" style={{ color:sc.color, background:sc.bg, borderColor:sc.border }}>
                      <span className="pill-dot" style={{ background:sc.dot }}/>
                      {sc.label}
                    </span>
                    <div className="ct-arrow" style={{
                      width:30, height:30, borderRadius:"50%",
                      background:"#f5f3ff", border:"1.5px solid #e0e7ff",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"#a5b4fc", fontSize:18, fontWeight:700
                    }}>›</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── STEP 1: DETAIL ── */}
        {step === 1 && selected && (() => {
          const sc = selected.canCancel ? STATUS.can : STATUS.cannot;
          return (
            <div style={{ display:"flex", flexDirection:"column", gap:14, animation:"fadeUp .25s ease" }}>
              <button className="ct-back" onClick={handleBack}>← Quay lại danh sách</button>

              {/* Event info card */}
              <div className="ct-card">
                {/* Hero */}
                <div style={{
                  padding:"26px 28px 24px",
                  background:"linear-gradient(135deg, #eef2ff 0%, #e8eeff 45%, #f5f0ff 100%)",
                  borderBottom:"1px solid #e0e7ff", position:"relative", overflow:"hidden"
                }}>
                  <div style={{ position:"absolute", top:-50, right:-40, width:200, height:200, borderRadius:"50%",
                    background:"radial-gradient(circle,rgba(129,140,248,.18) 0%,rgba(192,132,252,.1) 50%,transparent 70%)" }} />
                  <div style={{ position:"relative" }}>
                    <span className="pill" style={{ color:sc.color, background:sc.bg, borderColor:sc.border, marginBottom:14, display:"inline-flex" }}>
                      <span className="pill-dot" style={{ background:sc.dot }}/>{sc.label}
                    </span>
                    <div style={{ fontSize:22, fontWeight:900, color:"#0f172a", letterSpacing:"-.02em", lineHeight:1.3 }}>
                      {selected.eventData?.name}
                    </div>
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:10 }}>
                      <span style={{ fontSize:13, color:"#6d5fa0", fontWeight:500, display:"flex", alignItems:"center", gap:4 }}>
                        📅 {selected.eventData?.date}
                      </span>
                      <span style={{ fontSize:13, color:"#6d5fa0", fontWeight:500, display:"flex", alignItems:"center", gap:4 }}>
                        📍 {selected.eventData?.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info grid */}
                <div style={{ padding:"22px 24px" }}>
                  <div style={{ fontSize:11, fontWeight:700, color:"#a094c0", textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>
                    Thông tin sự kiện
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
                    <Tile icon="🎤" label="Diễn giả"   value={selected.eventData?.speaker} />
                    <Tile icon="💰" label="Giá vé"     value={selected.eventData?.price === 0 ? "Miễn phí" : fmt(selected.eventData?.price)} />
                    <Tile icon="🏷" label="Trạng thái" value={selected.eventData?.status} />
                  </div>

                  {/* Seats */}
                  <div style={{ fontSize:11, fontWeight:700, color:"#a094c0", textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>
                    Ghế ngồi
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {selected.seats?.map((s, i) => (
                      <div key={i} style={{
                        display:"flex", justifyContent:"space-between", alignItems:"center",
                        padding:"13px 16px", background:"#f4f5f7", border:"1px solid #eaecef", borderRadius:13
                      }}>
                        <div style={{ display:"flex", alignItems:"center", gap:11 }}>
                          <div style={{
                            width:34, height:34, borderRadius:10,
                            background:"linear-gradient(135deg,#eef2ff,#e0e7ff)", border:"1.5px solid #a5b4fc",
                            display:"flex", alignItems:"center", justifyContent:"center",
                            fontSize:12, fontWeight:800, color:"#4338ca"
                          }}>{s.seat}</div>
                          <span style={{ fontSize:14, fontWeight:600, color:"#334155" }}>Ghế {s.seat}</span>
                        </div>
                        <span style={{ fontSize:15, fontWeight:800, color:"#4338ca" }}>{fmt(s.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action card */}
              <div style={{
                background:"#fff", border:"1.5px solid #e0e7ff", borderRadius:20,
                boxShadow:"0 4px 24px rgba(99,102,241,.07)", padding:"22px 24px"
              }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#a094c0", textTransform:"uppercase", letterSpacing:".09em", marginBottom:16 }}>
                  Hành động
                </div>
                {!selected.canCancel && (
                  <div style={{
                    display:"flex", alignItems:"flex-start", gap:12,
                    background:"#fff7ed", border:"1px solid #fed7aa",
                    padding:"14px 18px", borderRadius:14, marginBottom:16,
                    color:"#9a3412", fontSize:13, fontWeight:500, lineHeight:1.6
                  }}>
                    ⚠️ Đã quá thời gian cho phép hủy vé tham gia sự kiện.
                  </div>
                )}
                <button
                  onClick={handleCancel}
                  disabled={!selected.canCancel}
                  className={`ct-btn ${selected.canCancel ? "enabled" : "disabled"}`}>
                  {selected.canCancel ? "Xác nhận hủy vé" : "Không thể hủy vé này"}
                </button>
              </div>
            </div>
          );
        })()}

        {/* MODAL */}
        {modal && (
          <div className={`ct-overlay${modal.hiding ? " hide" : ""}`}>
            <div className="ct-modal">
              <div className="ct-modal-circle">✅</div>
              <div className="ct-modal-title">Hủy vé thành công!</div>
              <button className="ct-modal-btn" onClick={dismissModal}>Đóng</button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}