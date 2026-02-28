import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events } from '../../mockData';

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const allowedStatus = ["Đang chuẩn bị", "Đang diễn ra", "Hoàn thành"];
const visibleEvents  = events.filter(ev => allowedStatus.includes(ev.status));

const STATUS_CFG = {
  "Đang chuẩn bị": { c: "#7C3AED", bg: "#EDE9FE", b: "#C4B5FD", dot: "#7C3AED" },
  "Đang diễn ra":  { c: "#059669", bg: "#D1FAE5", b: "#6EE7B7", dot: "#10B981" },
  "Hoàn thành":    { c: "#2563EB", bg: "#DBEAFE", b: "#93C5FD", dot: "#3B82F6" },
};

const fmt = (n) => Number(n)?.toLocaleString('vi-VN') + ' ₫';

const inputStyle = {
  width: "100%", boxSizing: "border-box",
  background: "#f8fafc", border: "1.5px solid #e2e8f0",
  borderRadius: 12, padding: "12px 16px",
  color: "#0f172a", fontSize: 14, outline: "none",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  transition: "all 0.2s",
};

const globalCss = `
  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeInUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
  @keyframes spin { to { transform:rotate(360deg); } }
  .ev-row { transition: all 0.15s; background: #fff; border-left: 3px solid transparent; }
  .ev-row:hover { background: #f8faff !important; border-left-color: #6366f1 !important; }
  .ev-row:hover .ev-arrow { color: #6366f1 !important; transform: translateX(3px); }
  .ev-arrow { transition: all 0.18s; }
  .btn-primary:hover { opacity:0.91; transform:translateY(-1px); }
  .btn-primary { transition: all 0.18s; }
  .seat-cell:hover { transform: scale(1.12) !important; }
`;

// ─── STEP INDICATOR ───────────────────────────────────────────────────────────
const Steps = ({ step, isFree }) => {
  const stepList = isFree
    ? ["Tìm kiếm", "Chi tiết", "Thông tin"]
    : ["Tìm kiếm", "Chi tiết", "Chọn ghế", "Thông tin"];
  const displayMap = isFree
    ? { 0: 0, 1: 1, 3: 2 }
    : { 0: 0, 1: 1, 2: 2, 3: 3 };
  const current = displayMap[step] ?? 0;

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 26, padding: "0 2px" }}>
      {stepList.map((s, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <React.Fragment key={i}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700,
                background: done || active ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#f1f5f9",
                color: done || active ? "#fff" : "#94a3b8",
                boxShadow: active
                  ? "0 0 0 5px rgba(99,102,241,0.15), 0 4px 12px rgba(99,102,241,0.4)"
                  : done ? "0 2px 8px rgba(99,102,241,0.25)" : "none",
                transition: "all 0.25s"
              }}>
                {done ? "✓" : i + 1}
              </div>
              <span style={{
                fontSize: 11, fontWeight: active ? 700 : 500,
                color: active ? "#6366f1" : done ? "#475569" : "#94a3b8",
                whiteSpace: "nowrap"
              }}>{s}</span>
            </div>
            {i < stepList.length - 1 && (
              <div style={{
                flex: 1, height: 2, margin: "-18px 10px 0",
                background: done ? "linear-gradient(90deg,#6366f1,#8b5cf6)" : "#e2e8f0",
                borderRadius: 99, transition: "background 0.35s"
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ─── DETAIL ROW ───────────────────────────────────────────────────────────────
const DetailRow = ({ icon, label, value }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 14,
    padding: "12px 14px", borderRadius: 12, marginBottom: 6,
    background: "#f8fafc", border: "1px solid #f1f5f9",
    transition: "background 0.15s"
  }}>
    <div style={{
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      background: "linear-gradient(135deg,#e0e7ff,#ede9fe)",
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16
    }}>{icon}</div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 14, color: "#1e293b", fontWeight: 600 }}>{value ?? "—"}</div>
    </div>
  </div>
);

// ─── SEAT MAP ─────────────────────────────────────────────────────────────────
const SeatMap = ({ seats, selectedSeats, onToggle }) => {
  if (!seats || seats.length === 0)
    return <div style={{ textAlign: "center", padding: "30px 0", color: "#94a3b8", fontSize: 14 }}>Không có dữ liệu sơ đồ ghế</div>;

  const rows = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const countByStatus = (s) => seats.filter(x => x.status === s).length;
  const isSelected    = (seat) => selectedSeats.some(s => s.id === seat.id);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Legend */}
      <div style={{ display: "flex", gap: 14, marginBottom: 22, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { bg: "#f1f5f9", border: "#cbd5e1", label: `Đã đặt (${countByStatus("taken")})` },
          { bg: "#fff",    border: "#a5b4fc", label: `Còn trống (${countByStatus("available")})` },
          { bg: "#fefce8", border: "#fde047", label: `VIP (${countByStatus("vip")})` },
          { bg: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "#4f46e5", label: `Đang chọn (${selectedSeats.length})` },
        ].map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: l.bg, border: `1.5px solid ${l.border}`, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Stage */}
      <div style={{
        width: "62%", minWidth: 190, textAlign: "center", marginBottom: 20, padding: "11px 0",
        background: "linear-gradient(135deg,#c7d2fe,#ddd6fe,#c7d2fe)",
        borderRadius: 12, fontSize: 12, fontWeight: 800,
        color: "#4338ca", letterSpacing: "0.14em",
        boxShadow: "0 4px 18px rgba(99,102,241,0.2)",
        border: "1px solid #a5b4fc"
      }}>🎤 SÂN KHẤU</div>

      <div style={{ width: "42%", height: 14, marginBottom: 4, background: "linear-gradient(to bottom,rgba(99,102,241,0.07),transparent)", borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />

      {/* Seats grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7, alignItems: "center", width: "100%" }}>
        {Object.entries(rows).map(([row, rowSeats]) => (
          <div key={row} style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
            <span style={{ width: 18, fontSize: 10, fontWeight: 700, color: "#cbd5e1", textAlign: "right", flexShrink: 0 }}>{row}</span>
            <div style={{ display: "flex", gap: 5 }}>
              {rowSeats.map(seat => {
                const isTaken = seat.status === "taken";
                const isVip   = seat.status === "vip";
                const sel     = isSelected(seat);
                let bg = "#fff", border = "#a5b4fc", color = "#4338ca", shadow = "0 1px 4px rgba(99,102,241,0.1)";
                if (isTaken) { bg = "#f1f5f9"; border = "#e2e8f0"; color = "#cbd5e1"; shadow = "none"; }
                if (isVip)   { bg = "#fefce8"; border = "#fde047"; color = "#92400e"; shadow = "0 1px 6px rgba(234,179,8,0.15)"; }
                if (sel)     { bg = "linear-gradient(135deg,#6366f1,#8b5cf6)"; border = "#4f46e5"; color = "#fff"; shadow = "0 4px 14px rgba(99,102,241,0.45)"; }
                return (
                  <div
                    key={seat.id}
                    className={!isTaken ? "seat-cell" : ""}
                    title={isTaken ? `${seat.id} – Đã đặt` : sel ? `${seat.id} – Đang chọn` : `${seat.id} – ${isVip ? "VIP · " : ""}Còn trống`}
                    onClick={() => !isTaken && onToggle(seat)}
                    style={{
                      width: 34, height: 34, borderRadius: 8,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700,
                      background: bg, border: `1.5px solid ${border}`, color,
                      cursor: isTaken ? "not-allowed" : "pointer",
                      transition: "all 0.13s",
                      transform: sel ? "scale(1.16)" : "scale(1)",
                      boxShadow: shadow,
                      userSelect: "none", position: "relative",
                    }}
                  >
                    {seat.number}
                    {isVip && !sel && <span style={{ position: "absolute", top: -6, right: -6, fontSize: 9 }}>⭐</span>}
                  </div>
                );
              })}
            </div>
            <span style={{ width: 18, fontSize: 10, fontWeight: 700, color: "#cbd5e1", flexShrink: 0 }}>{row}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, fontSize: 11, color: "#e2e8f0", letterSpacing: "0.12em", fontWeight: 600 }}>── LỐI ĐI ──</div>
    </div>
  );
};

// ─── SUCCESS ──────────────────────────────────────────────────────────────────
const SuccessScreen = ({ ev, form, selectedSeats, isFree, onReset }) => {
  const totalPrice = selectedSeats.length * (ev?.price ?? 0);
  return (
    <div style={{ animation: "fadeInUp 0.4s ease", display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 28px", textAlign: "center" }}>
      <div style={{ position: "relative", marginBottom: 24 }}>
        <div style={{
          width: 92, height: 92, borderRadius: "50%",
          background: "linear-gradient(135deg,#bbf7d0,#4ade80)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 44, boxShadow: "0 12px 36px rgba(16,185,129,0.3)",
          animation: "pop 0.5s ease 0.25s both"
        }}>🎉</div>
        <div style={{ position: "absolute", inset: -7, borderRadius: "50%", border: "2px dashed #a7f3d0", animation: "spin 14s linear infinite" }} />
      </div>

      <h2 style={{ fontSize: 26, fontWeight: 800, color: "#064e3b", margin: "0 0 10px", letterSpacing: "-0.02em" }}>Đăng ký thành công!</h2>
      <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 30px", maxWidth: 340, lineHeight: 1.75 }}>
        {isFree ? "Bạn đã đăng ký tham dự sự kiện miễn phí thành công. Hẹn gặp bạn tại sự kiện! 🙌" : "Bạn đã đặt vé thành công. Thông tin chi tiết được ghi nhận bên dưới."}
      </p>

      <div style={{
        background: "#fff", border: "1.5px solid #6ee7b7",
        borderRadius: 18, padding: "22px 26px", marginBottom: 28,
        boxShadow: "0 8px 32px rgba(5,150,105,0.1)",
        width: "100%", maxWidth: 420, textAlign: "left"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #f0fdf4" }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#d1fae5,#6ee7b7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🎫</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: "0.08em" }}>Chi tiết đăng ký</span>
        </div>
        {[
          { label: "Sự kiện",    value: ev.name },
          { label: "Ngày",       value: ev.date },
          { label: "Địa điểm",  value: ev.location },
          { label: "Họ tên",     value: form.name },
          { label: "Điện thoại", value: form.phone },
          { label: "Email",      value: form.email },
          { label: "Loại vé",    value: isFree ? "🎁 Miễn phí" : "💳 Có phí" },
          ...(!isFree ? [
            { label: "Ghế đã chọn", value: selectedSeats.map(s => s.id + (s.status === "vip" ? "⭐" : "")).join(", ") },
            { label: "Tổng tiền",   value: fmt(totalPrice) },
          ] : []),
        ].map(({ label, value }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px dashed #f0fdf4", gap: 16 }}>
            <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, textAlign: "right", color: label === "Tổng tiền" ? "#7c3aed" : "#0f172a" }}>{value}</span>
          </div>
        ))}
      </div>

      <button onClick={onReset} className="btn-primary" style={{
        padding: "13px 34px",
        background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
        border: "none", borderRadius: 14,
        color: "#fff", fontSize: 14, fontWeight: 700,
        cursor: "pointer", fontFamily: "inherit",
        boxShadow: "0 6px 20px rgba(99,102,241,0.35)"
      }}>🔍 Tìm kiếm sự kiện khác</button>
    </div>
  );
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const SearchEvent = () => {
  const [query, setQuery]                 = useState('');
  const [results, setResults]             = useState([]);
  const [searched, setSearched]           = useState(false);
  const [step, setStep]                   = useState(0);
  const [selectedEv, setSelectedEv]       = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [form, setForm]                   = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors]               = useState({});
  const [done, setDone]                   = useState(false);

  const isFree = selectedEv ? selectedEv.price === 0 : false;

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;
    setResults(visibleEvents.filter(ev => ev.name.toLowerCase().includes(q) || ev.location.toLowerCase().includes(q)));
    setSearched(true); setSelectedEv(null); setStep(0); setDone(false);
  };

  const handleSelectEvent = (ev) => {
    setSelectedEv(ev); setSelectedSeats([]);
    setErrors({}); setDone(false);
    setForm({ name: '', phone: '', email: '' }); setStep(1);
  };

  const handleRegister    = () => setStep(isFree ? 3 : 2);
  const handleToggleSeat  = (seat) => setSelectedSeats(prev => prev.some(s => s.id === seat.id) ? prev.filter(s => s.id !== seat.id) : [...prev, seat]);
  const handleNextToForm  = () => { if (!selectedSeats.length) return; setErrors({}); setStep(3); };

  const handleBack = () => {
    if (step === 3) setStep(isFree ? 1 : 2);
    else if (step === 2) setStep(1);
    else if (step === 1) { setStep(0); setSelectedEv(null); }
  };

  const handleReset = () => {
    setQuery(''); setResults([]); setSearched(false);
    setStep(0); setSelectedEv(null); setSelectedSeats([]);
    setDone(false); setForm({ name: '', phone: '', email: '' }); setErrors({});
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Vui lòng nhập họ tên";
    if (!form.phone.trim()) e.phone = "Vui lòng nhập số điện thoại";
    else if (!/^\d{9,11}$/.test(form.phone.trim())) e.phone = "Số điện thoại không hợp lệ";
    if (!form.email.trim()) e.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email không hợp lệ";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const existing    = JSON.parse(localStorage.getItem('pendingTickets') || '[]');
    const seatsToBook = selectedSeats.length > 0 ? selectedSeats : [null];
    const newTickets  = seatsToBook.map(seat => ({
      id: Date.now() + Math.random(), eventId: selectedEv.id,
      eventName: selectedEv.name, eventDate: selectedEv.date,
      eventLocation: selectedEv.location, price: selectedEv.price,
      seat: seat?.id ?? null, participantName: form.name.trim(),
      phone: form.phone.trim(), email: form.email.trim(),
      paid: false, createdAt: new Date().toISOString(),
    }));
    localStorage.setItem('pendingTickets', JSON.stringify([...existing, ...newTickets]));
    setDone(true);
  };

  const availableCount = selectedEv?.seats?.filter(s => s.status === "available").length ?? 0;
  const totalPrice     = selectedSeats.length * (selectedEv?.price ?? 0);

  return (
    <MainLayout>
      <style>{globalCss}</style>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0f172a" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 46, height: 46,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, boxShadow: "0 6px 20px rgba(99,102,241,0.35)"
          }}>🔍</div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>Tìm kiếm sự kiện</h1>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, marginTop: 2 }}>Tìm và đăng ký tham dự sự kiện</p>
          </div>
        </div>

        {/* SEARCH BAR */}
        {!done && (
          <div style={{
            background: "#fff", borderRadius: 18, padding: "18px 20px", marginBottom: 22,
            boxShadow: "0 2px 20px rgba(99,102,241,0.08), 0 1px 4px rgba(0,0,0,0.04)",
            border: "1px solid #e8ecf5"
          }}>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94a3b8", pointerEvents: "none" }}>🔎</span>
                <input
                  value={query}
                  placeholder="Tên sự kiện hoặc địa điểm..."
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  style={{ ...inputStyle, paddingLeft: 44 }}
                  onFocus={e  => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 4px rgba(99,102,241,0.1)"; e.target.style.background = "#fff"; }}
                  onBlur={e   => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; e.target.style.background = "#f8fafc"; }}
                />
              </div>
              <button onClick={handleSearch} className="btn-primary" style={{
                padding: "0 28px", height: 48,
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                color: "#fff", border: "none", borderRadius: 12,
                fontWeight: 700, fontSize: 14, cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 14px rgba(99,102,241,0.3)"
              }}>Tìm kiếm</button>
            </div>
          </div>
        )}

        {/* STEPS */}
        {searched && selectedEv && !done && <Steps step={step} isFree={isFree} />}

        {/* DONE */}
        {done && selectedEv && (
          <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2e8f0", boxShadow: "0 4px 28px rgba(0,0,0,0.07)" }}>
            <SuccessScreen ev={selectedEv} form={form} selectedSeats={selectedSeats} isFree={isFree} onReset={handleReset} />
          </div>
        )}

        {/* EMPTY */}
        {!done && !searched && (
          <div style={{ background: "#fff", borderRadius: 18, padding: "68px 40px", textAlign: "center", border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 56, marginBottom: 18, filter: "drop-shadow(0 4px 10px rgba(99,102,241,0.15))" }}>🔍</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#334155", marginBottom: 8 }}>Tìm sự kiện của bạn</div>
            <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.75 }}>Nhập tên sự kiện hoặc địa điểm<br/>để bắt đầu tìm kiếm</div>
          </div>
        )}

        {/* STEP 0: KẾT QUẢ */}
        {!done && searched && step === 0 && (
          <div style={{ background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0", animation: "fadeUp 0.25s ease" }}>
            <div style={{ padding: "14px 20px", background: "linear-gradient(to right,#f8faff,#f0f4ff)", borderBottom: "1px solid #e8ecf8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>Kết quả tìm kiếm</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#6366f1", background: "#ede9fe", padding: "3px 12px", borderRadius: 20, border: "1px solid #ddd6fe" }}>{results.length} sự kiện</span>
            </div>

            {results.length === 0 ? (
              <div style={{ padding: "54px 40px", textAlign: "center" }}>
                <div style={{ fontSize: 46, marginBottom: 12 }}>😕</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#334155", marginBottom: 6 }}>Không tìm thấy kết quả</div>
                <div style={{ fontSize: 13, color: "#94a3b8" }}>Thử từ khoá khác hoặc kiểm tra lại chính tả</div>
              </div>
            ) : results.map((ev, i) => {
              const sc       = STATUS_CFG[ev.status] || STATUS_CFG["Đang chuẩn bị"];
              const avail    = ev.seats?.filter(s => s.status === "available").length ?? 0;
              const isFull   = ev.price > 0 && avail === 0;
              const isFreeEv = ev.price === 0;
              return (
                <div key={ev.id} className="ev-row"
                  onClick={() => !isFull && handleSelectEvent(ev)}
                  style={{ padding: "16px 20px", borderBottom: i < results.length - 1 ? "1px solid #f8fafc" : "none", cursor: isFull ? "not-allowed" : "pointer", opacity: isFull ? 0.45 : 1, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 5 }}>{ev.name}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <span>📅 {ev.date}</span>
                      <span>📍 {ev.location}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, color: isFreeEv ? "#059669" : "#7c3aed", background: isFreeEv ? "#f0fdf4" : "#faf5ff", border: `1px solid ${isFreeEv ? "#bbf7d0" : "#e9d5ff"}` }}>
                      {isFreeEv ? "🎁 Miễn phí" : `💳 ${fmt(ev.price)}`}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 11px", borderRadius: 20, color: sc.c, background: sc.bg, border: `1px solid ${sc.b}`, display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: sc.dot, display: "inline-block", flexShrink: 0 }} />
                      {ev.status}
                    </span>
                    {!isFull && <span className="ev-arrow" style={{ color: "#c7d2fe", fontSize: 22, lineHeight: 1 }}>›</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 1: CHI TIẾT */}
        {!done && step === 1 && selectedEv && (
          <div style={{ animation: "fadeUp 0.22s ease" }}>
            <button onClick={handleBack} style={{ marginBottom: 18, padding: "9px 18px", borderRadius: 10, border: "1.5px solid #e2e8f0", cursor: "pointer", background: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 600, color: "#64748b", display: "flex", alignItems: "center", gap: 7 }}>
              ← Quay lại kết quả
            </button>

            <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 28px rgba(0,0,0,0.07)" }}>
              {/* Hero */}
              <div style={{
                padding: "26px 26px 22px",
                background: isFree ? "linear-gradient(135deg,#f0fdf4,#dcfce7,#f0fdf4)" : "linear-gradient(135deg,#ede9fe,#e0e7ff,#ede9fe)",
                borderBottom: `1px solid ${isFree ? "#bbf7d0" : "#c4b5fd"}`
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{
                    padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                    color: isFree ? "#059669" : "#7c3aed",
                    background: isFree ? "#dcfce7" : "#ede9fe",
                    border: `1px solid ${isFree ? "#6ee7b7" : "#c4b5fd"}`
                  }}>{isFree ? "🎁 Miễn phí" : `💳 ${fmt(selectedEv.price)}/ghế`}</div>
                </div>
                <h2 style={{ fontSize: 21, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{selectedEv.name}</h2>
              </div>

              <div style={{ padding: "20px 22px" }}>
                <DetailRow icon="🆔" label="Mã sự kiện"    value={selectedEv.id} />
                <DetailRow icon="🏢" label="Khách hàng"    value={selectedEv.client} />
                <DetailRow icon="📅" label="Ngày tổ chức"  value={selectedEv.date} />
                <DetailRow icon="📍" label="Địa điểm"      value={selectedEv.location} />
                <DetailRow icon="🎤" label="Diễn giả"      value={selectedEv.speaker} />
                <DetailRow icon="👥" label="Sức chứa"      value={selectedEv.participants} />
                <DetailRow icon="🎟️" label="Vé đã bán"    value={selectedEv.ticketsSold} />

                <div style={{ marginTop: 20 }}>
                  <button onClick={handleRegister} className="btn-primary" style={{
                    width: "100%", padding: "15px 0", borderRadius: 14, border: "none",
                    fontSize: 15, fontWeight: 800, color: "#fff",
                    background: isFree ? "linear-gradient(135deg,#059669,#047857)" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    cursor: "pointer", fontFamily: "inherit",
                    boxShadow: isFree ? "0 6px 22px rgba(5,150,105,0.32)" : "0 6px 22px rgba(99,102,241,0.38)",
                    letterSpacing: "0.01em"
                  }}>
                    {isFree ? "🎁 Đăng ký" : "🎫 Đăng ký"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CHỌN GHẾ */}
        {!done && step === 2 && selectedEv && !isFree && (
          <div style={{ animation: "fadeUp 0.22s ease" }}>
            <div style={{
              background: "linear-gradient(135deg,#eff6ff,#e0e7ff)", border: "1px solid #bfdbfe",
              borderRadius: 14, padding: "14px 20px", marginBottom: 16,
              display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1d4ed8", marginBottom: 3 }}>{selectedEv.name}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>📅 {selectedEv.date} · 📍 {selectedEv.location}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, borderRadius: 10, padding: "5px 13px", color: "#7c3aed", background: "#faf5ff", border: "1px solid #e9d5ff" }}>💳 {fmt(selectedEv.price)}/ghế</span>
                <span style={{ fontSize: 12, fontWeight: 700, borderRadius: 10, padding: "5px 13px", color: "#059669", background: "#f0fdf4", border: "1px solid #bbf7d0" }}>{availableCount} chỗ trống</span>
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18, padding: "26px 22px", marginBottom: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 22, textAlign: "center" }}>Sơ đồ chỗ ngồi — nhấn để chọn</div>
              <SeatMap seats={selectedEv.seats} selectedSeats={selectedSeats} onToggle={handleToggleSeat} />
            </div>

            {selectedSeats.length > 0 && (
              <div style={{ background: "linear-gradient(135deg,#faf5ff,#ede9fe)", border: "1px solid #c4b5fd", borderRadius: 12, padding: "12px 18px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#6d28d9" }}>✓ {selectedSeats.length} ghế:&nbsp;</span>
                  <span style={{ fontSize: 13, color: "#7c3aed" }}>{selectedSeats.map(s => s.id + (s.status === "vip" ? "⭐" : "")).join(", ")}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#6d28d9" }}>Tổng: {fmt(totalPrice)}</div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <button onClick={handleBack} style={{ padding: "11px 20px", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 12, color: "#64748b", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>← Quay lại</button>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {selectedSeats.length === 0 && <span style={{ fontSize: 12, color: "#94a3b8" }}>Chưa chọn ghế</span>}
                <button onClick={handleNextToForm} disabled={selectedSeats.length === 0} className="btn-primary" style={{
                  padding: "11px 26px",
                  background: selectedSeats.length > 0 ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#e2e8f0",
                  border: "none", borderRadius: 12,
                  color: selectedSeats.length > 0 ? "#fff" : "#94a3b8",
                  fontWeight: 700, fontSize: 14, fontFamily: "inherit",
                  cursor: selectedSeats.length > 0 ? "pointer" : "not-allowed",
                  boxShadow: selectedSeats.length > 0 ? "0 5px 16px rgba(99,102,241,0.32)" : "none"
                }}>
                  {selectedSeats.length > 0 ? `Tiếp theo (${selectedSeats.length} ghế) →` : "Tiếp theo →"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: FORM */}
        {!done && step === 3 && selectedEv && (
          <div style={{ animation: "fadeUp 0.22s ease", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Summary */}
            <div style={{
              width: "100%", maxWidth: 560,
              background: "linear-gradient(135deg,#f8faff,#f0f4ff)",
              border: "1px solid #e0e7ff", borderRadius: 14, padding: "18px 22px", marginBottom: 18,
              display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12
            }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>Sự kiện đã chọn</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#1e293b" }}>{selectedEv.name}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>📅 {selectedEv.date} · 📍 {selectedEv.location}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                {isFree ? (
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#059669", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: "6px 16px" }}>🎁 Miễn phí</div>
                ) : (
                  <>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end", marginBottom: 6 }}>
                      {selectedSeats.map(s => (
                        <span key={s.id} style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 7, padding: "3px 9px" }}>
                          {s.id}{s.status === "vip" ? "⭐" : ""}
                        </span>
                      ))}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#7c3aed" }}>Tổng: {fmt(totalPrice)}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{fmt(selectedEv.price)} × {selectedSeats.length} ghế</div>
                  </>
                )}
              </div>
            </div>

            {/* Form card */}
            <div style={{ width: "100%", maxWidth: 560, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: "28px 30px", boxShadow: "0 4px 28px rgba(0,0,0,0.07)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 22 }}>
                Thông tin người tham gia
              </div>
              {[
                { key: "name",  label: "Họ và tên",     placeholder: "Nguyễn Văn A"      },
                { key: "phone", label: "Số điện thoại", placeholder: "0901234567"         },
                { key: "email", label: "Email",          placeholder: "example@gmail.com"  },
              ].map(({ key, label, placeholder }) => (
                <div key={key} style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                    {label} <span style={{ color: "#f43f5e" }}>*</span>
                  </label>
                  <input
                    value={form[key]}
                    placeholder={placeholder}
                    onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); if (errors[key]) setErrors(er => ({ ...er, [key]: undefined })); }}
                    style={{ ...inputStyle, borderColor: errors[key] ? "#fca5a5" : "#e2e8f0" }}
                    onFocus={e  => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 4px rgba(99,102,241,0.1)"; e.target.style.background = "#fff"; }}
                    onBlur={e   => { e.target.style.borderColor = errors[key] ? "#fca5a5" : "#e2e8f0"; e.target.style.boxShadow = "none"; e.target.style.background = "#f8fafc"; }}
                  />
                  {errors[key] && <div style={{ fontSize: 12, color: "#ef4444", marginTop: 5 }}>⚠ {errors[key]}</div>}
                </div>
              ))}

              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={handleBack} style={{ flex: 1, padding: 13, background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 12, color: "#64748b", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>← Quay lại</button>
                <button onClick={handleSubmit} className="btn-primary" style={{
                  flex: 2, padding: 13,
                  background: isFree ? "linear-gradient(135deg,#059669,#047857)" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                  boxShadow: isFree ? "0 5px 16px rgba(5,150,105,0.28)" : "0 5px 16px rgba(99,102,241,0.32)"
                }}>✅ Xác nhận đăng ký</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default SearchEvent;