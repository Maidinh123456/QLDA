import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { tickets, events } from "../../mockData";

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

  .tt-root * { box-sizing: border-box; }
  .tt-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

  @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes overlayIn  { from{opacity:0} to{opacity:1} }
  @keyframes overlayOut { from{opacity:1} to{opacity:0} }
  @keyframes modalIn  { from{opacity:0;transform:scale(.88) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes modalOut { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(.92)} }

  /* ── LIST ROW ── */
  .tt-row {
    background: #fff;
    border: 1.5px solid #e0e7ff;
    border-radius: 18px;
    box-shadow: 0 2px 12px rgba(99,102,241,.06);
    cursor: pointer;
    transition: all .22s cubic-bezier(.4,0,.2,1);
    padding: 18px 22px;
    display: flex; align-items: center; gap: 16px;
  }
  .tt-row:hover {
    border-color: #a5b4fc;
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(99,102,241,.14);
  }
  .tt-row:hover .tt-arrow {
    background: #eef2ff !important;
    border-color: #c7d2fe !important;
    color: #4f46e5 !important;
    transform: translateX(3px);
  }
  .tt-arrow { transition: all .2s; }

  /* ── CARD ── */
  .tt-card {
    background: #fff;
    border: 1.5px solid #e0e7ff;
    border-radius: 20px;
    box-shadow: 0 4px 24px rgba(99,102,241,.07);
    overflow: hidden;
  }

  /* ── BACK BTN ── */
  .tt-back {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; background: #fff;
    border: 1.5px solid #e0e7ff; border-radius: 12px;
    cursor: pointer; font-size: 13px; font-weight: 600; color: #6d5fa0;
    font-family: 'Outfit', sans-serif; transition: all .15s; align-self: flex-start;
  }
  .tt-back:hover { border-color: #a5b4fc; color: #4338ca; background: #f5f3ff; }

  /* ── TILE ── */
  .tt-tile {
    background: #f4f5f7; border: 1px solid #eaecef;
    border-radius: 13px; padding: 12px 16px;
  }
  .tt-tile-label {
    font-size: 10px; font-weight: 700; color: #a094c0;
    text-transform: uppercase; letter-spacing: .07em; margin-bottom: 5px;
  }
  .tt-tile-value { font-size: 14px; font-weight: 700; color: #0f172a; line-height: 1.35; }

  /* ── PERSON TILE ── */
  .tt-person {
    background: #f4f5f7; border: 1px solid #eaecef;
    border-radius: 13px; padding: 14px 16px;
  }

  /* ── INPUT ── */
  .tt-input {
    padding: 12px 14px; border-radius: 12px;
    border: 1.5px solid #e0e7ff; background: #f8f7ff;
    font-size: 14px; font-family: 'Outfit', sans-serif; font-weight: 500; color: #0f172a;
    transition: border-color .2s, box-shadow .2s; outline: none; width: 100%;
  }
  .tt-input:focus { border-color: #818cf8; box-shadow: 0 0 0 3px rgba(129,140,248,.12); background: #fff; }
  .tt-input::placeholder { color: #c4b5e0; font-weight: 400; }
  .tt-input.err { border-color: #f472b6; }

  /* ── SUBMIT BTN ── */
  .tt-submit {
    width: 100%; padding: 15px; border-radius: 14px; border: none;
    background: linear-gradient(135deg, #818cf8, #a78bfa, #c084fc);
    color: #fff; font-size: 14px; font-weight: 700; font-family: 'Outfit', sans-serif;
    cursor: pointer; transition: all .2s;
    box-shadow: 0 4px 16px rgba(129,140,248,.35);
  }
  .tt-submit:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(129,140,248,.45); }

  /* ── PILL ── */
  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 700;
    padding: 4px 12px; border-radius: 99px; border: 1px solid; white-space: nowrap;
  }
  .pill-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

  /* ── MODAL ── */
  .tt-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(17,24,39,.4); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    animation: overlayIn .25s ease forwards;
  }
  .tt-overlay.hide { animation: overlayOut .25s ease forwards; }
  .tt-modal {
    background: #fff; border-radius: 24px; padding: 40px 36px 32px;
    text-align: center; max-width: 360px; width: 90%;
    box-shadow: 0 24px 64px rgba(0,0,0,.18);
    animation: modalIn .35s cubic-bezier(.34,1.56,.64,1) forwards;
  }
  .tt-overlay.hide .tt-modal { animation: modalOut .25s ease forwards; }
  .tt-modal-circle {
    width: 72px; height: 72px; border-radius: 50%;
    background: #f0f4ff; border: 2px solid #c7d2fe;
    display: flex; align-items: center; justify-content: center;
    font-size: 32px; margin: 0 auto 20px;
  }
  .tt-modal-title { font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 24px; font-family: 'Outfit', sans-serif; }
  .tt-modal-btn {
    padding: 12px 32px;
    background: linear-gradient(135deg, #818cf8, #a78bfa, #c084fc);
    color: #fff; border: none; border-radius: 12px;
    font-size: 14px; font-weight: 700; font-family: 'Outfit', sans-serif;
    cursor: pointer; transition: all .2s;
    box-shadow: 0 4px 14px rgba(129,140,248,.3);
  }
  .tt-modal-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(129,140,248,.4); }
`;

const STATUS = {
  can:    { color:"#059669", bg:"#ecfdf5", border:"#a7f3d0", dot:"#10b981", label:"Có thể chuyển" },
  cannot: { color:"#de3b3b", bg:"#ffd4d4", border:"#ffac9d", dot:"#de3b3b", label:"Không thể chuyển" },
};
const CAN_TRANSFER_STATUSES = ["Đang chuẩn bị", "Chờ phê duyệt"];

const Tile = ({ icon, label, value }) => (
  <div className="tt-tile">
    <div className="tt-tile-label">{icon} {label}</div>
    <div className="tt-tile-value">{value || "—"}</div>
  </div>
);

export default function TransferTicket() {
  const currentUserId = 4;

  const userTickets = tickets
    .filter(t => t.participantId === currentUserId)
    .map(t => {
      const event = events.find(e => e.id === t.eventId);
      return { ...t, eventData: event, canTransfer: CAN_TRANSFER_STATUSES.includes(event?.status) };
    });

  const [localTickets, setLocalTickets] = useState(userTickets);
  const [step,     setStep]     = useState(0);
  const [selected, setSelected] = useState(null);
  const [form,     setForm]     = useState({ name:"", phone:"", email:"" });
  const [errors,   setErrors]   = useState({});
  const [notify,   setNotify]   = useState(null);

  const senderInfo = { name:"Nguyễn Mai Đình", phone:"0111 111 111", email:"abc@gmail.com" };

  const handleSelect = t => { setSelected(t); setStep(1); setForm({ name:"", phone:"", email:"" }); setErrors({}); };
  const handleBack   = ()  => { setStep(0); setSelected(null); };

  const dismissNotify = () => {
    setNotify(prev => prev ? { ...prev, hiding:true } : null);
    setTimeout(() => setNotify(null), 320);
  };

  const handleSubmit = () => {
    if (!selected?.canTransfer) return;
    const e = {};
    if (!form.name.trim())  e.name  = "Vui lòng nhập họ tên";
    if (!form.phone.trim()) e.phone = "Vui lòng nhập số điện thoại";
    if (!form.email.trim()) e.email = "Vui lòng nhập email";
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLocalTickets(prev => prev.filter(t => t.id !== selected.id));
    handleBack();
    setNotify({ hiding:false });
  };

  return (
    <MainLayout role="participant">
      <style>{G}</style>
      <div className="tt-root" style={{ padding:"4px 0 40px" }}>

        {/* HEADER */}
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32, animation:"fadeUp .35s ease" }}>
          <div style={{
            width:54, height:54, borderRadius:16, flexShrink:0,
            background:"linear-gradient(135deg,#a5b4fc,#818cf8,#c084fc)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:24, boxShadow:"0 8px 24px rgba(129,140,248,.4)"
          }}>🔄</div>
          <div>
            <h1 style={{ fontSize:26, fontWeight:900, margin:0, letterSpacing:"-.03em", color:"#0f172a" }}>Chuyển nhượng vé</h1>
            <p style={{ fontSize:14, color:"#94a3b8", margin:"4px 0 0", fontWeight:500 }}>
              Chọn vé và nhập thông tin người nhận để chuyển nhượng
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
              const sc = t.canTransfer ? STATUS.can : STATUS.cannot;
              return (
                <div key={t.id} className="tt-row"
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
                      <span className="pill-dot" style={{ background:sc.dot }}/>{sc.label}
                    </span>
                    <div className="tt-arrow" style={{
                      width:30, height:30, borderRadius:"50%",
                      background:"#f0f4ff", border:"1.5px solid #e0e7ff",
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
          const sc = selected.canTransfer ? STATUS.can : STATUS.cannot;
          return (
            <div style={{ display:"flex", flexDirection:"column", gap:14, animation:"fadeUp .25s ease" }}>
              <button className="tt-back" onClick={handleBack}>← Quay lại danh sách</button>

              {/* Event info card */}
              <div className="tt-card">
                {/* Hero */}
                <div style={{
                  padding:"26px 28px 24px",
                  background:"linear-gradient(135deg, #f0f0ff 0%, #e8eeff 40%, #f5f0ff 100%)",
                  borderBottom:"1px solid #e0e7ff", position:"relative", overflow:"hidden"
                }}>
                  <div style={{ position:"absolute", top:-50, right:-40, width:200, height:200, borderRadius:"50%",
                    background:"radial-gradient(circle,rgba(129,140,248,.2) 0%,rgba(192,132,252,.1) 50%,transparent 70%)" }} />
                  <div style={{ position:"relative" }}>
                    <span className="pill" style={{ color:sc.color, background:sc.bg, borderColor:sc.border, marginBottom:14, display:"inline-flex" }}>
                      <span className="pill-dot" style={{ background:sc.dot }}/>{sc.label}
                    </span>
                    <div style={{ fontSize:22, fontWeight:900, color:"#0f172a", letterSpacing:"-.02em", lineHeight:1.3 }}>
                      {selected.eventData?.name}
                    </div>
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:10 }}>
                      <span style={{ fontSize:13, color:"#6d5fa0", fontWeight:500 }}>📅 {selected.eventData?.date}</span>
                      <span style={{ fontSize:13, color:"#6d5fa0", fontWeight:500 }}>📍 {selected.eventData?.location}</span>
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
                    <Tile icon="🏷" label="Trạng thái" value={selected.eventData?.status} />
                    <Tile icon="💰" label="Giá vé"     value={selected.eventData?.price === 0 ? "Miễn phí" : `${Number(selected.eventData?.price).toLocaleString("vi-VN")} ₫`} />
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
                            background:"linear-gradient(135deg,#eef2ff,#e0e7ff)", border:"1.5px solid #c7d2fe",
                            display:"flex", alignItems:"center", justifyContent:"center",
                            fontSize:12, fontWeight:800, color:"#4f46e5"
                          }}>{s.seat}</div>
                          <span style={{ fontSize:14, fontWeight:600, color:"#334155" }}>Ghế {s.seat}</span>
                        </div>
                        <span style={{ fontSize:15, fontWeight:800, color:"#4f46e5" }}>{Number(s.price).toLocaleString("vi-VN")} ₫</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Không thể chuyển */}
              {!selected.canTransfer && (
                <div style={{
                  background:"#fff7ed", border:"1px solid #fed7aa",
                  padding:"16px 20px", borderRadius:16,
                  color:"#9a3412", fontSize:13, fontWeight:500, lineHeight:1.6
                }}>
                  ⚠️ Đã quá thời gian cho phép chuyển nhượng vé tham gia sự kiện.
                </div>
              )}

              {/* Form chuyển nhượng */}
              {selected.canTransfer && (
                <div className="tt-card" style={{ overflow:"visible" }}>
                  {/* Người chuyển */}
                  <div style={{ padding:"22px 24px 18px", borderBottom:"1px solid #eef2ff" }}>
                    <div style={{ fontSize:11, fontWeight:700, color:"#a094c0", textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>
                      Người chuyển
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                      {[["👤 Họ tên", senderInfo.name], ["📞 Điện thoại", senderInfo.phone], ["📧 Email", senderInfo.email]].map(([l, v]) => (
                        <div className="tt-person" key={l}>
                          <div style={{ fontSize:10, fontWeight:700, color:"#a094c0", textTransform:"uppercase", letterSpacing:".07em", marginBottom:5 }}>{l}</div>
                          <div style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider arrow */}
                  <div style={{ display:"flex", alignItems:"center", gap:16, padding:"16px 24px", borderBottom:"1px solid #eef2ff" }}>
                    <div style={{ flex:1, height:1, background:"linear-gradient(to right,#f0f4ff,#c7d2fe,#f0f4ff)" }} />
                    <div style={{
                      width:32, height:32, borderRadius:"50%",
                      background:"linear-gradient(135deg,#eef2ff,#e0e7ff)", border:"1px solid #c7d2fe",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:14, fontWeight:700, color:"#4f46e5", flexShrink:0
                    }}>→</div>
                    <div style={{ flex:1, height:1, background:"linear-gradient(to right,#f0f4ff,#c7d2fe,#f0f4ff)" }} />
                  </div>

                  {/* Người nhận */}
                  <div style={{ padding:"22px 24px" }}>
                    <div style={{ fontSize:11, fontWeight:700, color:"#a094c0", textTransform:"uppercase", letterSpacing:".08em", marginBottom:16 }}>
                      Người nhận
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:20 }}>
                      {/* Họ tên — full width */}
                      <div style={{ gridColumn:"1/-1", display:"flex", flexDirection:"column", gap:6 }}>
                        <label style={{ fontSize:11, fontWeight:700, color:"#818cf8", textTransform:"uppercase", letterSpacing:".05em" }}>Họ và tên *</label>
                        <input className={`tt-input${errors.name?" err":""}`} type="text"
                          placeholder="Nhập họ và tên người nhận"
                          value={form.name}
                          onChange={e => { setForm(f=>({...f,name:e.target.value})); setErrors(er=>({...er,name:undefined})); }} />
                        {errors.name && <span style={{ fontSize:12, color:"#f472b6" }}>⚠ {errors.name}</span>}
                      </div>
                      {/* Phone */}
                      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                        <label style={{ fontSize:11, fontWeight:700, color:"#818cf8", textTransform:"uppercase", letterSpacing:".05em" }}>Số điện thoại *</label>
                        <input className={`tt-input${errors.phone?" err":""}`} type="text"
                          placeholder="0xxx xxx xxx"
                          value={form.phone}
                          onChange={e => { setForm(f=>({...f,phone:e.target.value})); setErrors(er=>({...er,phone:undefined})); }} />
                        {errors.phone && <span style={{ fontSize:12, color:"#f472b6" }}>⚠ {errors.phone}</span>}
                      </div>
                      {/* Email */}
                      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                        <label style={{ fontSize:11, fontWeight:700, color:"#818cf8", textTransform:"uppercase", letterSpacing:".05em" }}>Email *</label>
                        <input className={`tt-input${errors.email?" err":""}`} type="email"
                          placeholder="email@example.com"
                          value={form.email}
                          onChange={e => { setForm(f=>({...f,email:e.target.value})); setErrors(er=>({...er,email:undefined})); }} />
                        {errors.email && <span style={{ fontSize:12, color:"#f472b6" }}>⚠ {errors.email}</span>}
                      </div>
                    </div>
                    <button className="tt-submit" onClick={handleSubmit}>
                      Xác nhận chuyển nhượng
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* MODAL */}
        {notify && (
          <div className={`tt-overlay${notify.hiding?" hide":""}`}>
            <div className="tt-modal">
              <div className="tt-modal-circle">✅</div>
              <div className="tt-modal-title">Chuyển nhượng vé thành công!</div>
              <button className="tt-modal-btn" onClick={dismissNotify}>Đóng</button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}