import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { events } from '../../mockData';

// ===== FIX LOGIN (KHÔNG BỊ OUT) =====
if (!localStorage.getItem("currentUser")) {
  localStorage.setItem("currentUser", JSON.stringify({ role: "customer" }));
}

// ===== CONFIG =====
const currentCustomer = "Đại học Kinh tế";
const myEvents = events.filter(ev => ev.client === currentCustomer);

// ===== FAKE PARTICIPANTS =====
const generateParticipants = (event) =>
  Array.from({ length: event.participants }, (_, i) => ({
    id: i,
    name: `Khách ${i + 1}`,
    checkedIn: Math.random() > 0.5
  }));

// ===== PARTICIPANT LIST =====
const ParticipantList = ({ event, onBack }) => {
  const list = generateParticipants(event);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>
        ← Quay lại
      </button>

      <h2>👥 Danh sách người tham gia ({list.length})</h2>

      <div style={{
        marginTop: 12,
        background: "#fff",
        borderRadius: 12,
        border: "1px solid #eee",
        maxHeight: 400,
        overflowY: "auto"
      }}>
        {list.map((p, i) => (
          <div key={p.id} style={{
            padding: 12,
            display: "flex",
            justifyContent: "space-between",
            borderBottom: i < list.length - 1 ? "1px solid #f3f4f6" : "none"
          }}>
            <span>{p.name}</span>
            <span style={{ color: p.checkedIn ? "#16a34a" : "#f59e0b" }}>
              {p.checkedIn ? "✓ Đã check-in" : "Chưa"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== EVENT DETAIL =====
const EventDetail = ({ event, onBack, onViewParticipants }) => {
  return (
    <div style={{
      background: "#fff",
      padding: 20,
      borderRadius: 16,
      border: "1px solid #eee"
    }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>
        ← Quay lại
      </button>

      <h2 style={{ marginBottom: 10 }}>{event.name}</h2>

      <p>📅 {event.date}</p>
      <p>📍 {event.location}</p>
      <p>👥 {event.participants} người tham gia</p>

      <hr style={{ margin: "12px 0" }} />

      <p>👤 Người lập kế hoạch: <b>Nguyễn Đức Quốc Thắng</b></p>
      <p>🧑‍💼 Người phụ trách: <b>Võ Hải Triều</b></p>

      <button
        onClick={onViewParticipants}
        style={{
          marginTop: 12,
          background: "#6366f1",
          color: "#fff",
          padding: "8px 16px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer"
        }}
      >
        Xem danh sách người tham gia
      </button>
    </div>
  );
};

// ===== MAIN =====
const CustomerDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewParticipants, setViewParticipants] = useState(false);

  // 👉 View participant
  if (selectedEvent && viewParticipants) {
    return (
      <MainLayout role="customer">
        <ParticipantList
          event={selectedEvent}
          onBack={() => setViewParticipants(false)}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout role="customer">
      <div style={{ padding: 10 }}>

        {selectedEvent ? (
          <EventDetail
            event={selectedEvent}
            onBack={() => setSelectedEvent(null)}
            onViewParticipants={() => setViewParticipants(true)}
          />
        ) : (
          <>
            <h1 style={{ marginBottom: 16 }}>🎯 Sự kiện của bạn</h1>

            <div style={{
              background: "#fff",
              borderRadius: 12,
              border: "1px solid #eee"
            }}>
              {myEvents.map((ev, i) => (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEvent(ev)}
                  style={{
                    padding: 14,
                    cursor: "pointer",
                    borderBottom: i < myEvents.length - 1 ? "1px solid #f3f4f6" : "none"
                  }}
                >
                  <b>{ev.name}</b>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>
                    📅 {ev.date} · 📍 {ev.location}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </MainLayout>
  );
};

export default CustomerDashboard;