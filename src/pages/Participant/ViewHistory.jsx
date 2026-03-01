import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { events, tickets } from "../../mockData";

const STATUS = {
  "Đang chuẩn bị": { color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE", dot: "#7C3AED", label: "Chưa tham gia" },
  "Đang diễn ra":  { color: "#059669", bg: "#ECFDF5", border: "#A7F3D0", dot: "#10B981", label: "Đang tham gia" },
  "Hoàn thành":    { color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE", dot: "#3B82F6", label: "Đã tham gia"   },
};

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

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .vh {
    padding: 2px 2px;
    min-height: 100vh;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #0f172a;
  }

  /* HEADER */
  .vh-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px;
     font-family: 'Outfit', sans-serif; transition: all .15s; align-self: flex-start;

  }
  .vh-header-left { display: flex; align-items: center; gap: 14px; }
  .vh-icon {
    width: 46px; height: 46px; border-radius: 13px;
    background: linear-gradient(135deg,#6366f1,#8b5cf6);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; box-shadow: 0 6px 20px rgba(99,102,241,0.35);
    flex-shrink: 0;
  }
  .vh-header-left h1 { font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin: 0; }
  .vh-header-left p  { font-size: 13px; color: #94a3b8; margin: 0; margin-top: 2px; }

  /* LIST */
  .vh-list { display: flex; flex-direction: column; gap: 10px; animation: fadeUp 0.25s ease; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }

  .vh-item {
    background: #fff; border-radius: 18px; border: 1px solid #e2e8f0;
    border-left: 3px solid transparent; box-shadow: 0 2px 20px rgba(0,0,0,0.06);
    display: flex; align-items: stretch; overflow: hidden;
    cursor: pointer; transition: all 0.15s;
  }
  .vh-item:hover {
    background: #f8faff !important; border-left-color: #6366f1 !important;
    box-shadow: 0 4px 20px rgba(99,102,241,0.1); transform: translateY(-2px);
  }

  .vh-item-inner { flex: 1; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .vh-item-left { flex: 1; min-width: 0; }
  .vh-item-name { font-size: 14.5px; font-weight: 700; color: #0f172a; margin-bottom: 5px; line-height: 1.35; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vh-item-meta { display: flex; align-items: center; gap: 12px; font-size: 12px; color: #94a3b8; font-weight: 500; }
  .vh-item-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: #cbd5e1; flex-shrink: 0; }

  .vh-item-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .vh-pill { 
    display: inline-flex; align-items: center; gap: 6px; 
    font-size: 11px; font-weight: 700; 
    padding: 5px 14px; border-radius: 12px; border: 1px solid; 
    white-space: nowrap; 
  }
  .vh-chevron { 
    width: 28px; height: 28px; border-radius: 99px; 
    background: #f8fafc; border: 1.5px solid #e2e8f0; 
    display: flex; align-items: center; justify-content: center; 
    color: #94a3b8; font-size: 13px; font-weight: 700; 
    transition: all 0.18s; 
  }
  .vh-item:hover .vh-chevron { 
    background: #f0f4ff; border-color: #c4b5fd; 
    color: #6366f1; transform: translateX(3px); 
  }

  /* DETAIL */
  .vh-detail { display: flex; flex-direction: column; gap: 18px; animation: fadeUp 0.25s ease; }
  .vh-back-btn { 
    padding: 9px 18px; border-radius: 10px; border: 1.5px solid #e2e8f0; 
    background: #fff; cursor: pointer; font-size: 13px; font-weight: 600; 
    color: #64748b; transition: all 0.15s; align-self: flex-start; 
  }
  .vh-back-btn:hover { border-color: #6366f1; color: #6366f1; background: #f8faff; }

  .vh-info-card { 
    background: #fff; border-radius: 20px; border: 1px solid #e2e8f0; 
    box-shadow: 0 4px 28px rgba(0,0,0,0.07); overflow: hidden; 
  }

  /* ── HERO FIX: padding đều, thoáng, có orb trang trí ── */
  .vh-card-top { 
    padding: 32px 28px 28px;
    background: linear-gradient(135deg, #f0f0ff 0%, #e8eeff 45%, #f5f0ff 100%);
    border-bottom: 1px solid #e0e7ff;
    position: relative; overflow: hidden;
  }
  .vh-card-top-orb {
    position: absolute; top: -50px; right: -40px;
    width: 220px; height: 220px; border-radius: 50%;
    background: radial-gradient(circle, rgba(129,140,248,.2) 0%, rgba(192,132,252,.1) 50%, transparent 70%);
    pointer-events: none;
  }
  .vh-card-top-inner { position: relative; }
  .vh-card-eyebrow { 
    font-size: 11px; font-weight: 700; text-transform: uppercase; 
    letter-spacing: 0.09em; color: #a094c0; margin-bottom: 10px; 
  }
  .vh-card-title { 
    font-size: 22px; font-weight: 900; color: #0f172a; 
    letter-spacing: -0.02em; line-height: 1.3; margin-bottom: 14px;
  }
  .vh-card-chips { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .vh-chip { 
    display: inline-flex; align-items: center; gap: 5px; 
    font-size: 12px; font-weight: 700; padding: 5px 14px; 
    border-radius: 99px; border: 1px solid; white-space: nowrap;
  }
  /* chip ngày/địa điểm: xám nhạt hòa tông */
  .vh-chip-meta {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 12px; font-weight: 600; padding: 5px 14px;
    border-radius: 99px; border: 1px solid #ddd6fe;
    background: rgba(255,255,255,.75); color: #6d5fa0; white-space: nowrap;
  }

  .vh-status-card { 
    background: #fff; border-radius: 18px; border: 1px solid #e2e8f0; 
    box-shadow: 0 4px 28px rgba(0,0,0,0.07); padding: 22px 26px; 
  }
  .vh-status-label { 
    font-size: 11px; font-weight: 700; text-transform: uppercase; 
    letter-spacing: 0.07em; color: #94a3b8; margin-bottom: 14px; 
  }
  .vh-stat-row { display: flex; gap: 12px; flex-wrap: wrap; }
  .vh-stat-box { 
    flex: 1; min-width: 180px; background: #f8fafc; border: 1px solid #f1f5f9; 
    border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 6px; 
  }
  .vh-stat-box-label { 
    font-size: 11px; font-weight: 700; text-transform: uppercase; 
    letter-spacing: 0.07em; color: #94a3b8; 
  }
  .vh-stat-box-value { 
    font-size: 14px; font-weight: 700; 
  }
`;

export default function ViewHistory() {
  const myTickets = tickets
    .filter(t => t.participantId === 4)
    .map(t => ({ ...t, ev: events.find(e => e.id === t.eventId) }));

  const [step, setStep]       = useState(0);
  const [selected, setSelected] = useState(null);

  const handleSelect = (t) => { setSelected(t); setStep(1); };
  const handleBack   = ()    => { setStep(0); setSelected(null); };

  return (
    <MainLayout role="participant">
      <style>{G}</style>
      <div className="vh">

        <div className="vh-header">
          <div className="vh-header-left">
            <div className="vh-icon">🎫</div>
            <div>
              <h1>Lịch sử đăng ký</h1>
              <p>Tất cả sự kiện bạn đã đăng ký tham gia</p>
            </div>
          </div>
        </div>

        {step === 0 && (
          <div className="vh-list">
            {myTickets.map((t, i) => {
              const sc = STATUS[t.ev.status] || STATUS["Hoàn thành"];
              return (
                <div
                  key={t.id}
                  className="vh-item"
                  style={{ animationDelay: `${i * 0.05}s` }}
                  onClick={() => handleSelect(t)}
                >
                  <div className="vh-item-inner">
                    <div className="vh-item-left">
                      <div className="vh-item-name">{t.ev.name}</div>
                      <div className="vh-item-meta">
                        <span>📅 {t.ev.date}</span>
                        <span className="vh-item-meta-dot" />
                        <span>📍 {t.ev.location}</span>
                      </div>
                    </div>
                    <div className="vh-item-right">
                      <span className="vh-pill" style={{ color: sc.color, background: sc.bg, borderColor: sc.border }}>
                        {t.ev.status}
                      </span>
                      <div className="vh-chevron">›</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {step === 1 && selected && (() => {
          const sc = STATUS[selected.ev.status] || STATUS["Hoàn thành"];
          return (
            <div className="vh-detail">
              <button className="vh-back-btn" onClick={handleBack}>← Quay lại danh sách</button>

              <div className="vh-info-card">
                {/* ── HERO đã fix: padding thoáng, chip đồng màu, orb trang trí ── */}
                <div className="vh-card-top">
                  <div className="vh-card-top-orb" />
                  <div className="vh-card-top-inner">
                    <div className="vh-card-eyebrow">Chi tiết đăng ký</div>
                    <div className="vh-card-title">{selected.ev.name}</div>
                    <div className="vh-card-chips">
                      {/* badge trạng thái */}
                      <span className="vh-chip" style={{ color: sc.color, background: sc.bg, borderColor: sc.border }}>
                        {selected.ev.status}
                      </span>
                      {/* chip ngày — màu trung tính hòa tông tím nhạt */}
                      <span className="vh-chip-meta">📅 {selected.ev.date}</span>
                      <span className="vh-chip-meta">📍 {selected.ev.location}</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "24px 26px" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Thông tin sự kiện</div>
                  <DetailRow icon="📅" label="Thời gian" value={selected.ev.date} />
                  <DetailRow icon="📍" label="Địa điểm" value={selected.ev.location} />
                  <DetailRow icon="🎤" label="Diễn giả" value={selected.ev.speaker} />
                  <DetailRow icon="👥" label="Sức chứa" value={selected.ev.participants} />

                  <div style={{ marginTop: 28 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Thông tin người tham gia</div>
                    <DetailRow icon="👤" label="Họ và tên" value="Nguyễn Mai Đình" />
                    <DetailRow icon="📱" label="Số điện thoại" value="0111 111 111" />
                    <DetailRow icon="✉️" label="Email" value="abc@gmail.com" />
                  </div>
                </div>
              </div>

              <div className="vh-status-card">
                <div className="vh-status-label">Tình trạng vé</div>
                <div className="vh-stat-row">
                  <div className="vh-stat-box">
                    <span className="vh-stat-box-label">Tham gia</span>
                    <span className="vh-stat-box-value" style={{ color: sc.color }}>{sc.label}</span>
                  </div>
                  <div className="vh-stat-box">
                    <span className="vh-stat-box-label">Thanh toán</span>
                    <span className="vh-stat-box-value" style={{ color: "#059669" }}>Đã thanh toán</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

      </div>
    </MainLayout>
  );
}