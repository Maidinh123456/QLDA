import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { events } from "../../mockData";

const CustomerViewEvent = () => {
  return (
    <MainLayout role="customer">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 700 }}>
            Danh sách sự kiện
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            Tổng cộng {events.length} sự kiện
          </p>
        </div>

        {/* Event List */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                <th style={{ padding: "12px" }}>ID</th>
                <th style={{ padding: "12px" }}>Tên sự kiện</th>
                <th style={{ padding: "12px" }}>Ngày</th>
                <th style={{ padding: "12px" }}>Địa điểm</th>
                <th style={{ padding: "12px" }}>Tiến độ</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td style={{ padding: "12px" }}>#{event.id}</td>
                  <td style={{ padding: "12px", fontWeight: 500 }}>
                    {event.name}
                  </td>
                  <td style={{ padding: "12px" }}>{event.date}</td>
                  <td style={{ padding: "12px" }}>{event.location}</td>

                  <td style={{ padding: "12px" }}>
                    <div
                      style={{
                        background: "#e5e7eb",
                        height: "6px",
                        borderRadius: "4px",
                        overflow: "hidden",
                        width: "120px",
                      }}
                    >
                      <div
                        style={{
                          width: `${event.progress}%`,
                          background: "#6366f1",
                          height: "100%",
                        }}
                      />
                    </div>

                    <span style={{ fontSize: "12px", color: "#6b7280" }}>
                      {event.progress}%
                    </span>
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

export default CustomerViewEvent;