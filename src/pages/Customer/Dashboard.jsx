import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { events, participants, reports } from "../../mockData";

const Dashboard = () => {
  return (
    <MainLayout role="customer">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 700 }}>
            Customer Dashboard
          </h1>
        </div>

        {/* Thống kê */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "14px",
          marginBottom: "24px"
        }}>
          {[
            { label: "Sự kiện", value: events.length },
            { label: "Người tham dự", value: participants.length },
            { label: "Báo cáo", value: reports.length }
          ].map(({ label, value }) => (
            <div key={label} style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              padding: "16px"
            }}>
              <div style={{ fontSize: "22px", fontWeight: 700 }}>{value}</div>
              <div style={{ fontSize: "12px", color: "#9ca3af" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Danh sách sự kiện */}
        <div style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "20px"
        }}>
          <h3 style={{ marginBottom: "15px" }}>Danh sách sự kiện</h3>

          {events.map((event) => (
            <div key={event.id} style={{
              borderBottom: "1px solid #f3f4f6",
              padding: "10px 0"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>{event.name}</strong>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    Ngày: {event.date}
                  </div>
                </div>

                <Link to={`/customer/event/${event.id}`}>
                  <button style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    background: "#0891b2",
                    color: "#fff",
                    cursor: "pointer"
                  }}>
                    Xem chi tiết
                  </button>
                </Link>
              </div>

              {/* Thanh tiến độ */}
              <div style={{
                marginTop: "8px",
                background: "#f3f4f6",
                height: "6px",
                borderRadius: "4px"
              }}>
                <div style={{
                  width: `${event.progress}%`,
                  height: "100%",
                  background: "#6366f1",
                  borderRadius: "4px"
                }} />
              </div>
              <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
                Tiến độ: {event.progress}%
              </div>
            </div>
          ))}
        </div>

        {/* Người tham gia */}
        <div style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "20px"
        }}>
          <h3>Danh sách người tham gia</h3>
          {participants.map((p) => (
            <div key={p.id} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 0"
            }}>
              <span>{p.name}</span>
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                Event #{p.eventId}
              </span>
            </div>
          ))}
        </div>

        {/* Báo cáo */}
        <div style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "20px"
        }}>
          <h3>Báo cáo sau sự kiện</h3>
          {reports.map((r) => (
            <div key={r.id} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 0"
            }}>
              <span>{r.event}</span>
              <strong style={{ color: "#059669" }}>
                {r.revenue}
              </strong>
            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
};

export default Dashboard;