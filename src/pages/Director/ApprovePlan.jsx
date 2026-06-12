import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events } from '../../mockData';

// ===== BADGE =====
const Badge = ({ children, color }) => (
  <span style={{
    background: color.bg,
    color: color.text,
    padding: '4px 10px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600
  }}>
    {children}
  </span>
);

const statusColor = {
  'Chờ phê duyệt': { bg: '#fef3c7', text: '#92400e' },
  'Đang chuẩn bị': { bg: '#dbeafe', text: '#1e40af' },
  'Đã duyệt': { bg: '#dcfce7', text: '#166534' }
};

// ===== DETAIL =====
const EventDetail = ({ event, onBack, onApprove }) => {
  return (
    <div>

      <button onClick={onBack} style={{
        marginBottom: 20,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        color: '#6b7280'
      }}>
        ← Quay lại
      </button>

      {/* HEADER */}
      <div style={{
        background: 'linear-gradient(135deg,#ede9fe,#dbeafe)',
        padding: 24,
        borderRadius: 16,
        marginBottom: 20
      }}>
        <h2 style={{ marginBottom: 10 }}>{event.name}</h2>

        <div style={{ display: 'flex', gap: 10 }}>
          <Badge color={statusColor[event.status] || statusColor['Chờ phê duyệt']}>
            {event.status}
          </Badge>
          <span>📅 {event.date}</span>
          <span>📍 {event.location}</span>
        </div>
      </div>

      {/* INFO CARD */}
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        border: '1px solid #eee'
      }}>
        <h4>📌 Thông tin sự kiện</h4>
        <p>🎤 {event.speaker}</p>
        <p>👥 {event.participants}</p>
      </div>

      {/* USER CARD */}
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        border: '1px solid #eee'
      }}>
        <h4>👤 Người đăng ký</h4>
        <p>{event.client}</p>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => onApprove(event.id)}
        style={{
          background: 'linear-gradient(135deg,#059669,#047857)',
          color: '#fff',
          padding: '12px 24px',
          border: 'none',
          borderRadius: 12,
          cursor: 'pointer',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(5,150,105,0.3)'
        }}
      >
        ✓ Phê duyệt
      </button>
    </div>
  );
};

// ===== MAIN =====
const ApprovePlan = () => {
  const [localEvents, setLocalEvents] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleApprove = (id) => {
    setLocalEvents(prev =>
      prev.map(ev =>
        ev.id === id ? { ...ev, approved: true, status: 'Đã duyệt' } : ev
      )
    );

    alert("✅ Phê duyệt thành công!");
    setSelectedEvent(null);
  };

  const pending = localEvents.filter(ev => !ev.approved);
  const approved = localEvents.filter(ev => ev.approved);

  return (
    <MainLayout role="director">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {selectedEvent ? (
          <EventDetail
            event={selectedEvent}
            onBack={() => setSelectedEvent(null)}
            onApprove={handleApprove}
          />
        ) : (
          <>
            <h1 style={{ marginBottom: 20 }}>📋 Phê duyệt kế hoạch</h1>

            {/* PENDING */}
            <div style={{ marginBottom: 30 }}>
              <h3>⏳ Chờ duyệt</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {pending.map(ev => (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedEvent(ev)}
                    style={{
                      background: '#fff',
                      borderRadius: 14,
                      padding: 18,
                      border: '1px solid #eee',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = ''}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <b>{ev.name}</b>
                      <Badge color={statusColor[ev.status] || statusColor['Chờ phê duyệt']}>
                        {ev.status}
                      </Badge>
                    </div>

                    <div style={{ marginTop: 6, color: '#6b7280' }}>
                      📅 {ev.date} · 📍 {ev.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* APPROVED */}
            {approved.length > 0 && (
              <div>
                <h3>✅ Đã duyệt</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {approved.map(ev => (
                    <div key={ev.id} style={{
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      borderRadius: 12,
                      padding: 14
                    }}>
                      {ev.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </MainLayout>
  );
};

export default ApprovePlan;