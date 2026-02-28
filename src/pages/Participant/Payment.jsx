import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { tickets, events } from "../../mockData";

const fmt = (n) => Number(n).toLocaleString("vi-VN") + " ₫";

/* ─────────────────────────── CSS ─────────────────────────────────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

  .pay-root * { box-sizing: border-box; }
  .pay-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes scaleIn { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }
  @keyframes spin    { to{transform:rotate(360deg)} }
  @keyframes pop     { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
  @keyframes dotpulse{ 0%,100%{opacity:.3;transform:scale(.75)} 50%{opacity:1;transform:scale(1)} }

  .card {
    background: #fff;
    border: 1.5px solid #ede9fe;
    border-radius: 20px;
    box-shadow: 0 4px 24px rgba(139,92,246,.07);
  }

  .trow {
    background: #fff;
    border: 1.5px solid #ede9fe;
    border-radius: 18px;
    box-shadow: 0 2px 12px rgba(139,92,246,.05);
    cursor: pointer;
    transition: all .22s cubic-bezier(.4,0,.2,1);
  }
  .trow:hover {
    border-color: #c4b5fd;
    transform: translateY(-3px);
    box-shadow: 0 12px 36px rgba(139,92,246,.14);
  }
  .trow:hover .trow-arrow {
    background: #ede9fe !important;
    border-color: #c4b5fd !important;
    color: #7c3aed !important;
    transform: translateX(4px);
  }
  .trow-arrow { transition: all .2s; }

  .method-row {
    display: flex; align-items: center; gap: 14px;
    padding: 16px 18px; border-radius: 14px; cursor: pointer;
    border: 1.5px solid #e8e4ff; background: #faf8ff;
    transition: all .2s; margin-bottom: 10px;
  }
  .method-row:hover { border-color: #c4b5fd; background: #f5f0ff; }
  .method-row.on { border-color: #a78bfa; background: #f5f0ff; box-shadow: 0 0 0 3px rgba(167,139,250,.15); }

  .btn-primary {
    background: linear-gradient(135deg, #c084fc, #a78bfa, #818cf8);
    border: none; color: #fff;
    font-family: 'Outfit',sans-serif; font-weight: 800;
    cursor: pointer; transition: all .2s;
    box-shadow: 0 6px 20px rgba(167,139,250,.45);
  }
  .btn-primary:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 32px rgba(167,139,250,.55); }
  .btn-primary:disabled { background:#e8e0ff; color:#b8a8d8; box-shadow:none; cursor:not-allowed; }

  .btn-back {
    background: #faf8ff; border: 1.5px solid #e8e0ff; color: #7c6fa0;
    font-family: 'Outfit',sans-serif; font-weight: 600;
    cursor: pointer; transition: all .18s;
  }
  .btn-back:hover { background:#f0ebff; border-color:#c4b5fd; color:#6d28d9; }

  .info-tile {
    background: #f4f5f7; border: 1px solid #eaecef; border-radius: 13px; padding: 12px 15px;
  }

  .bselect {
    width:100%; padding:11px 14px; border-radius:11px;
    border:1.5px solid #e8e0ff; background:#fff; color:#0f172a;
    font-family:'Outfit',sans-serif; font-size:14px; font-weight:500;
    outline:none; cursor:pointer; transition:all .2s;
    -webkit-appearance:none; appearance:none; margin-top:10px;
  }
  .bselect:focus { border-color:#a78bfa; box-shadow:0 0 0 3px rgba(167,139,250,.12); }

  .ldot {
    width:7px; height:7px; border-radius:50%;
    background:#fff; display:inline-block;
    animation:dotpulse 1.1s ease-in-out infinite;
  }
  .ldot:nth-child(2){animation-delay:.18s}
  .ldot:nth-child(3){animation-delay:.36s}

  .chip {
    display:inline-flex; align-items:center; gap:5px;
    padding:4px 11px; border-radius:20px; font-size:12px; font-weight:700;
  }

  .stub { background:#fff; border-radius:22px; overflow:hidden; box-shadow:0 20px 60px rgba(139,92,246,.14); border:1px solid #ede9fe; }
`;

/* ─── RADIO ──────────────────────────────────────────────────────────────── */
const Radio = ({ on }) => (
  <div style={{ width:22, height:22, borderRadius:"50%", flexShrink:0,
    border:`2px solid ${on?"#a78bfa":"#d4c6ff"}`,
    display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}>
    {on && <div style={{ width:11, height:11, borderRadius:"50%", background:"linear-gradient(135deg,#c084fc,#818cf8)" }} />}
  </div>
);

/* ─── INFO TILE ──────────────────────────────────────────────────────────── */
const InfoTile = ({ icon, label, value }) => (
  <div className="info-tile">
    <div style={{ fontSize:10, fontWeight:700, color:"#a094c0", textTransform:"uppercase", letterSpacing:".07em", marginBottom:5 }}>
      {icon} {label}
    </div>
    <div style={{ fontSize:14, fontWeight:700, color:"#0f172a", lineHeight:1.35 }}>{value||"—"}</div>
  </div>
);

/* ═══════════════════════════════ MAIN ═══════════════════════════════════════ */
export default function Payment() {
  const currentUserId = 4;

  const [myTickets, setMyTickets] = useState(
  tickets
    .filter(t => t.participantId === currentUserId)
    .map(t => ({ ...t, ev: events.find(e => e.id === t.eventId) }))
    .slice(0, 1) // chỉ giữ lại 1 sự kiện
);

  const [step,     setStep]     = useState(0);
  const [selected, setSelected] = useState(null);
  const [invoice,  setInvoice]  = useState(null);
  const [method,   setMethod]   = useState("momo");
  const [bank,     setBank]     = useState("");
  const [loading,  setLoading]  = useState(false);

  const bankLogos = {
    Vietcombank: "/Vietcombank_Logo.png",
    Techcombank: "/Techcombank_logo.png",
    "MB Bank"  : "/Logo_MB_new.png",
  };

  const total  = selected?.seats?.reduce((s, x) => s + x.price, 0) || 0;
  const canPay = method === "momo" || (method === "bank" && bank && bank !== "other");

  const handleSelect = t => { setSelected(t); setStep(1); };
  const handleBack   = () => { setStep(0); setSelected(null); };

  const handlePay = () => {
    if (!canPay) return;
    setLoading(true);
    setTimeout(() => {
      setInvoice({
        event   : selected.ev.name,
        date    : selected.ev.date,
        location: selected.ev.location,
        speaker : selected.ev.speaker,
        client  : selected.ev.client,
        seats   : selected.seats,
        total,
        method  : method === "momo" ? "Ví MoMo" : bank,
        email   : "maidinh823532@gmail.com",
        code    : Math.random().toString(36).slice(2, 8).toUpperCase(),
      });
      setMyTickets(p => p.filter(t => t.id !== selected.id));
      setLoading(false);
      setStep(2);
      setSelected(null);
    }, 2200);
  };

  return (
    <MainLayout role="participant">
      <style>{G}</style>
      <div className="pay-root" style={{ padding:"4px 0 40px" }}>

        {/* HEADER — icon: cam→tím xanh pastel */}
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32, animation:"fadeUp .35s ease" }}>
          <div style={{
            width:54, height:54, borderRadius:16, flexShrink:0,
            background:"linear-gradient(135deg,#c084fc,#818cf8,#67e8f9)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:24, boxShadow:"0 8px 24px rgba(167,139,250,.4)"
          }}>💳</div>
          <div>
            <h1 style={{ fontSize:26, fontWeight:900, margin:0, letterSpacing:"-.03em", color:"#0f172a" }}>Thanh toán vé</h1>
            <p style={{ fontSize:14, color:"#94a3b8", margin:"4px 0 0", fontWeight:500 }}>
              Hoàn tất thanh toán để xác nhận chỗ ngồi của bạn
            </p>
          </div>
        </div>

        {/* ══ STEP 0 ══ */}
        {step === 0 && (
          <div style={{ animation:"fadeUp .3s ease" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".09em", marginBottom:16 }}>
              Vé chờ thanh toán ({myTickets.length})
            </div>

            {myTickets.length === 0 && (
              <div className="card" style={{ padding:"72px 40px", textAlign:"center" }}>
                <div style={{ fontSize:56, marginBottom:16 }}>🎫</div>
                <div style={{ fontSize:18, fontWeight:800, color:"#1e293b", marginBottom:8 }}>Không có vé cần thanh toán</div>
                <div style={{ fontSize:14, color:"#94a3b8", fontWeight:500 }}>Tất cả vé của bạn đã được thanh toán</div>
              </div>
            )}

            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {myTickets.map((t, i) => {
                return (
                  <div key={t.id} className="trow"
                    onClick={() => handleSelect(t)}
                    style={{ padding:"18px 22px", display:"flex", alignItems:"center", gap:16,
                      animation:`fadeUp .3s ease ${i*.08}s both` }}>
                    {/* left: tên + meta */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:15, fontWeight:800, color:"#0f172a", marginBottom:6 }}>
                        {t.ev?.name}
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#94a3b8", fontWeight:500 }}>
                        <span>📅 {t.ev?.date}</span>
                        <span style={{ width:3, height:3, borderRadius:"50%", background:"#cbd5e1", display:"inline-block", flexShrink:0 }}/>
                        <span>📍 {t.ev?.location}</span>
                      </div>
                    </div>
                    {/* right: badge + arrow */}
                    <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                      <span style={{
                        fontSize:13, fontWeight:700, padding:"5px 14px", borderRadius:99,
                        color:"#7c3aed", background:"#f0ebff", border:"1px solid #ddd6fe"
                      }}>⏳ Chờ thanh toán</span>
                      <div className="trow-arrow" style={{
                        width:30, height:30, borderRadius:"50%",
                        background:"#faf8ff", border:"1.5px solid #e8e0ff",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        color:"#94a3b8", fontSize:18, fontWeight:700
                      }}>›</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ STEP 1 ══ */}
        {step === 1 && selected && (
          <div style={{ animation:"fadeUp .25s ease" }}>
            <button onClick={handleBack} className="btn-back"
              style={{ marginBottom:22, padding:"9px 18px", borderRadius:10, fontSize:13, display:"flex", alignItems:"center", gap:7 }}>
              ← Quay lại
            </button>

            {/* Event card */}
            <div className="card" style={{ marginBottom:14, overflow:"hidden", padding:0 }}>
              {/* Hero banner — vàng/cam/hồng → xanh/hồng/tím pastel */}
              <div style={{
                padding:"26px 28px 24px",
                background:"linear-gradient(135deg,#f0e8ff,#e0f0ff,#ffe8f8)",
                borderBottom:"1.5px solid #ede9fe",
                position:"relative", overflow:"hidden"
              }}>
                {/* orb: vàng→tím */}
                <div style={{ position:"absolute", top:-40, right:-40, width:200, height:200, borderRadius:"50%",
                  background:"radial-gradient(circle,rgba(192,132,252,.22) 0%,rgba(96,165,250,.1) 50%,transparent 70%)" }} />
                <div style={{ position:"relative" }}>
                  <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
                  
                  </div>
                  
                  <h2 style={{ fontSize:22, fontWeight:900, color:"#0f172a", margin:0, letterSpacing:"-.02em", lineHeight:1.3 }}>
                    {selected.ev?.name}
                  </h2>
                   
                  <div>
                    {/* badge: vàng→tím */}
                    <span className="chip" style={{ color:"#7c3aed", background:"rgba(255,255,255,.8)", border:"1px solid #ddd6fe" }}>⏳ Chờ thanh toán</span>
                  </div>
                </div>
              </div>

              <div style={{ padding:"20px 24px" }}>
                {/* Info grid */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:22 }}>
                  <InfoTile icon="🎤" label="Diễn giả"   value={selected.ev?.speaker} />
                  <InfoTile icon="🏢" label="Tổ chức"    value={selected.ev?.client} />
                  <InfoTile icon="👥" label="Sức chứa"   value={selected.ev?.participants} />
                  <InfoTile icon="🆔" label="Mã sự kiện" value={selected.ev?.id} />
                  <InfoTile icon="🎟️" label="Vé đã bán" value={selected.ev?.ticketsSold} />
                  <InfoTile icon="💰" label="Giá/ghế"    value={selected.ev?.price ? fmt(selected.ev.price) : "—"} />
                </div>

                {/* Seats */}
                <div style={{ fontSize:11, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>Chi tiết ghế ngồi</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:18 }}>
                  {selected.seats?.map((s, i) => (
                    <div key={i} style={{
                      display:"flex", justifyContent:"space-between", alignItems:"center",
                      padding:"13px 16px", background:"#f4f5f7", border:"1.5px solid #eaecef", borderRadius:13
                    }}>
                      <div style={{ display:"flex", alignItems:"center", gap:11 }}>
                        <div style={{
                          width:34, height:34, borderRadius:10,
                          background:"linear-gradient(135deg,#ede9fe,#ddd6fe)", border:"1.5px solid #c4b5fd",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:13, fontWeight:800, color:"#7c3aed"
                        }}>{s.seat}</div>
                        <span style={{ fontSize:14, fontWeight:600, color:"#334155" }}>Ghế {s.seat}</span>
                      </div>
                      <span style={{ fontSize:16, fontWeight:800, color:"#6d28d9" }}>{fmt(s.price)}</span>
                    </div>
                  ))}
                </div>

                {/* Total — faf5ff/ede9fe giữ nguyên (đã tím sẵn) */}
                <div style={{
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  padding:"16px 20px", borderRadius:14,
                  background:"linear-gradient(135deg,#f0e8ff,#e8f0ff,#ffe8f8)", border:"1.5px solid #ddd6fe"
                }}>
                  <span style={{ fontSize:15, fontWeight:600, color:"#64748b" }}>Tổng cộng</span>
                  <span style={{ fontSize:24, fontWeight:900, color:"#7c3aed" }}>{fmt(total)}</span>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="card" style={{ padding:"22px 24px", marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".08em", marginBottom:18 }}>
                Phương thức thanh toán
              </div>

              {/* MoMo */}
              <div className={`method-row${method==="momo"?" on":""}`} onClick={() => setMethod("momo")}>
                <Radio on={method==="momo"} />
                <div style={{
                  width:44, height:44, borderRadius:12, flexShrink:0, overflow:"hidden",
                  background:"#fff", border:"1.5px solid #ede9fe", boxShadow:"0 2px 8px rgba(139,92,246,.08)",
                  display:"flex", alignItems:"center", justifyContent:"center"
                }}>
                  <img src="/MoMo_Logo_App.svg.png" alt="MoMo"
                    style={{ width:36, height:36, objectFit:"contain" }}
                    onError={e => { e.target.outerHTML = '<span style="font-size:22px">💜</span>'; }} />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:"#0f172a" }}>Ví điện tử MoMo</div>
                  <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>Thanh toán nhanh — không cần thẻ</div>
                </div>
              
              </div>

              {/* Bank — dbeafe/ede9fe giữ nguyên */}
              <div className={`method-row${method==="bank"?" on":""}`} onClick={() => setMethod("bank")}
                style={{ marginBottom: method==="bank" ? 0 : 10 }}>
                <Radio on={method==="bank"} />
                <div style={{
                  width:44, height:44, borderRadius:12, flexShrink:0,
                  background:"linear-gradient(135deg,#dbeafe,#ede9fe)", border:"1.5px solid #c7d2fe",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:22
                }}>🏦</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:"#0f172a" }}>Ngân hàng liên kết</div>
                  <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>ATM · Internet Banking · QR Pay</div>
                </div>
              </div>

              {/* Bank expand */}
              {method === "bank" && (
                <div style={{
                  padding:"16px 18px", borderRadius:"0 0 14px 14px",
                  background:"#faf8ff", border:"1.5px solid #ede9fe", borderTop:"none",
                  animation:"fadeIn .2s ease"
                }}>
                  <div style={{ fontSize:12, fontWeight:600, color:"#64748b", marginBottom:2 }}>Chọn ngân hàng</div>
                  <div style={{ position:"relative" }}>
                    <select className="bselect" value={bank} onChange={e => setBank(e.target.value)}>
                      <option value="">Chọn ngân hàng...</option>
                      <option value="Vietcombank">Vietcombank</option>
                      <option value="Techcombank">Techcombank</option>
                      <option value="MB Bank">MB Bank</option>
                      <option value="other">+ Thêm ngân hàng khác</option>
                    </select>
                    <span style={{ position:"absolute", right:14, top:"50%", marginTop:5, transform:"translateY(-50%)", fontSize:11, color:"#94a3b8", pointerEvents:"none" }}>▾</span>
                  </div>

                  {bank && bank !== "other" && (
                    <div style={{
                      marginTop:12, display:"flex", alignItems:"center", gap:12,
                      padding:"12px 14px", borderRadius:12,
                      background:"#fff", border:"1.5px solid #ddd6fe",
                      animation:"fadeIn .2s ease"
                    }}>
                      <div style={{
                        width:46, height:46, borderRadius:12, flexShrink:0,
                        background:"#faf8ff", border:"1.5px solid #ede9fe", overflow:"hidden",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        boxShadow:"0 2px 8px rgba(139,92,246,.07)"
                      }}>
                        <img src={bankLogos[bank]} alt={bank}
                          style={{ width:38, height:38, objectFit:"contain" }}
                          onError={e => { e.target.style.display="none"; }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>{bank}</div>
                        <div style={{ fontSize:11, color:"#7c3aed", marginTop:2, fontWeight:600 }}>✓ Đã kết nối</div>
                      </div>
                    </div>
                  )}

                  {bank === "other" && (

                    <div style={{ marginTop:12, padding:"12px 14px", borderRadius:11,
                      background:"#f5f0ff", border:"1px solid #ddd6fe",
                      fontSize:13, color:"#6d28d9", fontWeight:500 }}>
                      Tính năng đang cập nhật. Vui lòng chọn ngân hàng có sẵn.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pay button */}
            <button onClick={handlePay} disabled={!canPay || loading} className="btn-primary"
              style={{ width:"100%", padding:"18px 0", borderRadius:16, fontSize:17,
                display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
              {loading ? (
                <>
                  <span style={{ fontWeight:700 }}>Đang xử lý</span>
                  <span style={{ display:"flex", gap:5, alignItems:"center" }}>
                    <span className="ldot"/><span className="ldot"/><span className="ldot"/>
                  </span>
                </>
              ) : <>✨ Xác nhận thanh toán &nbsp;{fmt(total)}</>}
            </button>

            {!canPay && method === "bank" && !loading && (
              <div style={{ textAlign:"center", marginTop:10, fontSize:12, color:"#94a3b8", fontWeight:500 }}>
                Vui lòng chọn ngân hàng để tiếp tục
              </div>
            )}
          </div>
        )}

        {/* ══ STEP 2 ══ */}
        {step === 2 && invoice && (
          <div style={{ animation:"scaleIn .4s ease", display:"flex", flexDirection:"column", alignItems:"center", paddingTop:12 }}>
            <div style={{ position:"relative", marginBottom:28 }}>
              {/* vòng tròn: xanh lá → tím hồng pastel */}
              <div style={{
                width:100, height:100, borderRadius:"50%",
                background:"linear-gradient(135deg,#e8d5ff,#c4dcff,#ffd4f0)",
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:48,
                boxShadow:"0 0 0 14px rgba(167,139,250,.1), 0 16px 40px rgba(167,139,250,.28)",
                animation:"pop .55s ease .2s both"
              }}>🎉</div>
              {/* viền xoay: xanh lá → tím */}
              <div style={{ position:"absolute", inset:-10, borderRadius:"50%", border:"2.5px dashed rgba(167,139,250,.45)", animation:"spin 16s linear infinite" }} />
            </div>

            <h2 style={{ fontSize:30, fontWeight:900, color:"#0f172a", margin:"0 0 10px", letterSpacing:"-.03em" }}>Thanh toán thành công!</h2>
            <p style={{ fontSize:15, color:"#64748b", margin:"0 0 36px", maxWidth:380, lineHeight:1.85, textAlign:"center", fontWeight:500 }}>
              Vé đã được xác nhận. Kiểm tra email để nhận vé điện tử.
            </p>

            <div className="stub" style={{ width:"100%", maxWidth:440, marginBottom:32 }}>
              {/* Header — giữ nguyên indigo/violet đã tím sẵn */}
              <div style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7,#818cf8)", padding:"26px 28px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.5)", textTransform:"uppercase", letterSpacing:".11em", marginBottom:10 }}>🎫 Vé đã xác nhận</div>
                <div style={{ fontSize:20, fontWeight:900, color:"#fff", lineHeight:1.3, marginBottom:12 }}>{invoice.event}</div>
                <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                  <span style={{ fontSize:13, color:"rgba(255,255,255,.75)", fontWeight:500 }}>📅 {invoice.date}</span>
                  <span style={{ fontSize:13, color:"rgba(255,255,255,.75)", fontWeight:500 }}>📍 {invoice.location}</span>
                </div>
                {invoice.speaker && <div style={{ fontSize:13, color:"rgba(255,255,255,.65)", marginTop:6, fontWeight:500 }}>🎤 {invoice.speaker}</div>}
                {invoice.client  && <div style={{ fontSize:13, color:"rgba(255,255,255,.65)", marginTop:4, fontWeight:500 }}>🏢 {invoice.client}</div>}
              </div>

              {/* Body */}
              <div style={{ background:"#fff", padding:"22px 28px" }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".07em", marginBottom:12 }}>Chi tiết ghế</div>
                {invoice.seats.map((s, i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                    padding:"11px 14px", background:"#faf8ff", border:"1px solid #ede9fe", borderRadius:11, marginBottom:8 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:32, height:32, borderRadius:9,
                        background:"linear-gradient(135deg,#ede9fe,#ddd6fe)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:13, fontWeight:800, color:"#7c3aed" }}>{s.seat}</div>
                      <span style={{ fontSize:14, fontWeight:600, color:"#334155" }}>Ghế {s.seat}</span>
                    </div>
                    <span style={{ fontSize:15, fontWeight:800, color:"#7c3aed" }}>{fmt(s.price)}</span>
                  </div>
                ))}

                {/* Perforation */}
                <div style={{ display:"flex", alignItems:"center", margin:"18px -28px" }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:"#f0ebff", flexShrink:0 }} />
                  <div style={{ flex:1, borderTop:"2.5px dashed #e4d9ff" }} />
                  <div style={{ width:22, height:22, borderRadius:"50%", background:"#f0ebff", flexShrink:0 }} />
                </div>

                {[
                  ["💰 Tổng tiền",  fmt(invoice.total), "#7c3aed"],
                  ["💳 Thanh toán", invoice.method,     "#0f172a"],
                  ["📧 Email",      invoice.email,      "#0f172a"],
                  ["✅ Trạng thái", "Đã thanh toán",    "#7c3aed"],
                ].map(([label, val, color]) => (
                  <div key={label} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:"1px solid #faf8ff", gap:12 }}>
                    <span style={{ fontSize:12, color:"#94a3b8", fontWeight:500, flexShrink:0 }}>{label}</span>
                    <span style={{ fontSize:13, fontWeight:700, textAlign:"right", color }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* Footer — f8fafc → tím nhạt */}
              <div style={{ background:"#f5f0ff", padding:"15px 28px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ fontSize:11, color:"#94a3b8", fontWeight:500 }}>Mã giao dịch</div>
                <div style={{ fontSize:15, fontWeight:900, color:"#7c3aed", letterSpacing:".07em" }}>#{invoice.code}</div>
              </div>
            </div>

            <button onClick={() => setStep(0)} className="btn-back" style={{ padding:"13px 32px", borderRadius:14, fontSize:14 }}>
              ← Quay về danh sách vé
            </button>
          </div>
        )}

      </div>
    </MainLayout>
  );
}