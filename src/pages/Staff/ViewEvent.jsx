import React, { useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { events } from "../../mockData";

const statusConfig = {
  "Đang chuẩn bị": { c: "#d97706", bg: "#fffbeb", b: "#fde68a" },
  "Đang triển khai": { c: "#2563eb", bg: "#eff6ff", b: "#bfdbfe" },
  "Đang diễn ra": { c: "#059669", bg: "#ecfdf5", b: "#a7f3d0" },
  "Chưa bắt đầu": { c: "#f97316", bg: "#fff7ed", b: "#fed7aa" },
  "Hoàn thành": { c: "#6366f1", bg: "#eef2ff", b: "#c7d2fe" }
};

const Info = ({ label, value }) => (
  <div>
    <div
      style={{
        fontSize: "11px",
        color: "#9ca3af",
        textTransform: "uppercase",
        marginBottom: "4px",
        fontWeight: 600
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: "14px", fontWeight: 500 }}>
      {value}
    </div>
  </div>
);

const ViewEvent = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredEvents = useMemo(() => {
    const key = search.trim().toLowerCase();

    return events
      .filter((ev) => ev.status !== "Chờ phê duyệt") // ❌ bỏ trạng thái chờ phê duyệt
      .filter((ev) => {
        const matchSearch =
          !key ||
          ev.name.toLowerCase().includes(key) ||
          ev.client.toLowerCase().includes(key);

        const matchStatus = statusFilter
          ? ev.status === statusFilter
          : true;

        return matchSearch && matchStatus;
      });
  }, [search, statusFilter]);

  return (
    <MainLayout role="staff">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "24px" }}>
          Xem thông tin sự kiện
        </h1>

        {/* Filter */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "18px",
            marginBottom: "24px"
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "12px" }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên sự kiện hoặc khách hàng..."
              style={{
                background: "#f9fafb",
                border: "1.5px solid #e5e7eb",
                borderRadius: "10px",
                padding: "10px 12px",
                fontSize: "13px",
                outline: "none"
              }}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                background: "#f9fafb",
                border: "1.5px solid #e5e7eb",
                borderRadius: "10px",
                padding: "10px 12px",
                fontSize: "13px"
              }}
            >
              <option value="">Tất cả trạng thái</option>
              {Object.keys(statusConfig).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Event List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {filteredEvents.map((ev) => {
            const cfg = statusConfig[ev.status];

            return (
              <div
                key={ev.id}
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  border: "1px solid #e5e7eb",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                }}
              >
                {/* Header */}
               {/* Header */}
<div
  style={{
    background: cfg.bg,
    borderBottom: `1px solid ${cfg.b}`,
    padding: "18px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}
>
  <div>
    <h2
      style={{
        margin: 0,
        fontSize: "18px",
        fontWeight: 700,
        color: "#111827"
      }}
    >
      {ev.name}
    </h2>
    <div
      style={{
        fontSize: "13px",
        color: "#6b7280",
        marginTop: "4px"
      }}
    >
      Khách hàng: {ev.client}
    </div>
  </div>

  <span
    style={{
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: 600,
      background: "rgba(255,255,255,0.8)",
      color: cfg.c,
      border: `1px solid ${cfg.b}`
    }}
  >
    {ev.status}
  </span>
</div>

                {/* Info Row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    padding: "20px 24px",
                    gap: "20px"
                  }}
                >
                  <Info label="📅 Ngày" value={ev.date} />
                  <Info label="📍 Địa điểm" value={ev.location} />
                  <Info label="🎤 Diễn giả" value={ev.speaker} />
                  <Info label="💰 Ngân sách" value={`${ev.budget.toLocaleString()} VNĐ`} />
                  <Info label="👥 Tham dự" value={`${ev.participants} người`} />
                  <Info label="🎫 Bán vé" value={`${ev.ticketsSold} vé`} />
                  <Info label="📊 Tiến độ" value={`${ev.progress}%`} />
                </div>

                {/* Phê duyệt */}
                <div style={{ padding: "0 24px 12px", fontSize: "13px" }}>
                  <strong>Phê duyệt: </strong>
                  {ev.approved ? (
                    <span style={{ color: "#16a34a" }}>Đã duyệt</span>
                  ) : (
                    <span style={{ color: "#f59e0b" }}>Chưa duyệt</span>
                  )}
                </div>

                {/* Progress Bar */}
                <div style={{ padding: "0 24px 20px" }}>
                  <div
                    style={{
                      height: "6px",
                      background: "#e5e7eb",
                      borderRadius: "6px",
                      overflow: "hidden"
                    }}
                  >
                    <div
                      style={{
                        width: `${ev.progress}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #6366f1, #8b5cf6)"
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default ViewEvent;