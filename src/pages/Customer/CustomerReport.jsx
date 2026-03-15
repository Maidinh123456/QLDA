import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { reports, events } from "../../mockData";

const thStyle = {
  padding: "12px 16px",
  textAlign: "left",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "13px",
  color: "#6b7280",
  background: "#f9fafb"
};

const tdStyle = {
  padding: "12px 16px",
  borderBottom: "1px solid #f3f4f6",
  fontSize: "14px",
  color: "#111827"
};

const CustomerReport = () => {
  return (
    <MainLayout role="customer">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        
        <h2 style={{ marginBottom: "20px" }}>Báo cáo sau sự kiện</h2>

        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            overflow: "hidden"
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Sự kiện</th>
                <th style={thStyle}>Người tham gia</th>
                <th style={thStyle}>Check-in</th>
                <th style={thStyle}>Tỷ lệ</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => {
                const event = events.find(e => e.id === report.eventId);

                const rate = Math.round(
                  (report.checkedIn / report.totalParticipants) * 100
                );

                return (
                  <tr key={report.id}>
                    <td style={tdStyle}>{report.id}</td>
                    <td style={tdStyle}>{event?.name}</td>
                    <td style={tdStyle}>{report.totalParticipants}</td>
                    <td style={tdStyle}>{report.checkedIn}</td>
                    <td style={tdStyle}>{rate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </MainLayout>
  );
};

export default CustomerReport;