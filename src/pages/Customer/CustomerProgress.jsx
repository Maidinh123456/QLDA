import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { events } from "../../mockData";

const CustomerProgress = () => {
  return (
    <MainLayout role="customer">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>

        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 700 }}>
            Tiến độ sự kiện
          </h1>

          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            Theo dõi tiến độ tổ chức các sự kiện
          </p>
        </div>

        {/* Progress List */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
            gap: "20px"
          }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
              }}
            >
              <h3 style={{ margin: "0 0 10px 0", fontSize: "18px" }}>
                {event.name}
              </h3>

              <p style={{ fontSize: "13px", color: "#9ca3af" }}>
                Event #{event.id}
              </p>

              {/* Progress bar */}
              <div
                style={{
                  marginTop: "15px",
                  background: "#e5e7eb",
                  height: "8px",
                  borderRadius: "5px",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    width: `${event.progress}%`,
                    background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
                    height: "100%"
                  }}
                />
              </div>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "13px",
                  color: "#6b7280"
                }}
              >
                Tiến độ: {event.progress}%
              </p>
            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
};

export default CustomerProgress;