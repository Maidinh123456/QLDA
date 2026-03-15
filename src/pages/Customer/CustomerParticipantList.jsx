import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { participants } from "../../mockData";

const CustomerParticipantList = () => {
  const checkedIn = participants.filter(p => p.checkedIn).length;

  return (
    <MainLayout role="customer">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 700 }}>
            Danh sách người tham dự
          </h1>

          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            {checkedIn}/{participants.length} đã check-in
          </p>
        </div>

        {/* Table */}
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
                <th style={{ padding: "12px" }}>Tên</th>
                <th style={{ padding: "12px" }}>Sự kiện</th>
                <th style={{ padding: "12px" }}>Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {participants.map((p) => (
                <tr key={p.id}>
                  <td style={{ padding: "12px" }}>#{p.id}</td>
                  <td style={{ padding: "12px" }}>{p.name}</td>
                  <td style={{ padding: "12px" }}>Event #{p.eventId}</td>

                  <td style={{ padding: "12px" }}>
                    {p.checkedIn ? "✓ Đã vào" : "Chờ check-in"}
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

export default CustomerParticipantList;