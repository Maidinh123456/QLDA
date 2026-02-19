import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { events } from "../../mockData";

const s = {
  page: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "#111827",
  },

  header: {
    marginBottom: "32px",
  },

  iconBox: (bg, glow) => ({
    width: "42px",
    height: "42px",
    background: bg,
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    boxShadow: `0 6px 16px ${glow}`,
  }),

  title: {
    fontSize: "26px",
    fontWeight: 700,
    margin: 0,
  },

  sub: {
    color: "#6b7280",
    fontSize: "14px",
    marginTop: "6px",
  },

  statCard: (color) => ({
    background: "#ffffff",
    border: `1px solid ${color}30`,
    borderRadius: "14px",
    padding: "18px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    boxShadow: `0 4px 14px ${color}20`,
  }),

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    fontSize: "12px",
    color: "#6b7280",
    borderBottom: "1px solid #eee",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #f3f4f6",
  },
};

const Badge = ({ text, color, bg }) => (
  <span
    style={{
      background: bg,
      color: color,
      padding: "4px 10px",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: 600,
    }}
  >
    {text}
  </span>
);

const DirectorDashboard = () => {
  const approved = events.filter((e) => e.approved).length;
  const pending = events.filter((e) => !e.approved).length;

  return (
    <MainLayout role="director">
      <div style={s.page}>
        {/* Header */}
        <div style={s.header}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={s.iconBox(
                "linear-gradient(135deg, #6366f1, #8b5cf6)",
                "rgba(99,102,241,0.3)"
              )}
            >
              📊
            </div>

            <h1 style={s.title}>Director Dashboard</h1>
          </div>

          <p style={s.sub}>Tổng quan toàn bộ sự kiện</p>
        </div>

        {/* Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "30px",
          }}
        >
          <div style={s.statCard("#6366f1")}>
            <div style={{ fontSize: 26 }}>📅</div>
            <div>
              <b style={{ fontSize: 22 }}>{events.length}</b>
              <div>Tổng sự kiện</div>
            </div>
          </div>

          <div style={s.statCard("#22c55e")}>
            <div style={{ fontSize: 26 }}>✅</div>
            <div>
              <b style={{ fontSize: 22 }}>{approved}</b>
              <div>Đã phê duyệt</div>
            </div>
          </div>

          <div style={s.statCard("#f59e0b")}>
            <div style={{ fontSize: 26 }}>⏳</div>
            <div>
              <b style={{ fontSize: 22 }}>{pending}</b>
              <div>Chờ duyệt</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h3>Danh sách sự kiện</h3>

          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Tên sự kiện</th>
                <th style={s.th}>Ngày</th>
                <th style={s.th}>Trạng thái</th>
                <th style={s.th}>Phê duyệt</th>
              </tr>
            </thead>

            <tbody>
              {events.map((ev) => (
                <tr key={ev.id}>
                  <td style={s.td}>{ev.name}</td>
                  <td style={s.td}>{ev.date}</td>

                  <td style={s.td}>
                    <Badge
                      text={ev.status}
                      color="#2563eb"
                      bg="#eff6ff"
                    />
                  </td>

                  <td style={s.td}>
                    {ev.approved ? (
                      <Badge text="Đã duyệt" color="#16a34a" bg="#ecfdf5" />
                    ) : (
                      <Badge text="Chờ duyệt" color="#f59e0b" bg="#fff7ed" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default DirectorDashboard;
