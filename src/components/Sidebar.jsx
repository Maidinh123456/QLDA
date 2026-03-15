import { Link, useLocation } from "react-router-dom";

export const SIDEBAR_WIDTH = "256px";


const BG = "#ffffff";
const BORDER = "#ebebf2";
const TEXT = "#1a1a2e";
const TEXT_MUTED = "#8888a8";
const HOVER_BG = "#f5f5fb";
const FONT = "'Plus Jakarta Sans', sans-serif";

const menuIcons = {
  Dashboard: "⊞",
  "Phê duyệt kế hoạch": "📋",
  "Xem báo cáo": "📈",
  "Tạo sự kiện": "✦",
  "Phân công": "⚡",
  "Duyệt kịch bản": "📜",
  "Tiến độ": "◎",
  "Báo cáo": "📊",
  "Điểm danh": "✅",
  "Tạo kịch bản": "✎",
  "Thiết bị": "⚙",
  "Danh sách tham gia": "👥",
  "Sự kiện": "🗓",
  "Tìm sự kiện": "🔍",
  "Xem sự kiện": "📋",
  "Đăng ký sự kiện": "🎫",
  "Thanh toán": "💳",
  "Hủy vé": "🚫",
  "Chuyển vé": "🔄",
  "Khảo sát": "💬",
  "Nội dung": "✍️",
};

const menus = {
  director: [
    { path: "/director/dashboard", label: "Dashboard" },
    { path: "/director/approve-plan", label: "Phê duyệt kế hoạch" },
    { path: "/director/view-report", label: "Xem báo cáo" },
  ],
  manager: [
    { path: "/manager/dashboard", label: "Dashboard" },
    { path: "/manager/create-event", label: "Tạo sự kiện" },
    { path: "/manager/assign-task", label: "Phân công" },
    { path: "/manager/approve-script", label: "Duyệt kịch bản" },
    { path: "/manager/progress", label: "Tiến độ" },
    { path: "/manager/view-report", label: "Báo cáo" },
  ],
  staff: [
    { path: "/staff/dashboard", label: "Dashboard" },
    { path: "/staff/attendance", label: "Điểm danh" },
    { path: "/staff/create-script", label: "Tạo kịch bản" },
    { path: "/staff/equipment", label: "Thiết bị" },
    { path: "/staff/participant-list", label: "Danh sách tham gia" },
    { path: "/staff/report", label: "Báo cáo" },
    { path: "/staff/view-event", label: "Sự kiện" },
  ],
  participant: [
    { path: "/participant/dashboard", label: "Dashboard" },
    { path: "/participant/search-event", label: "Tìm sự kiện" },
    { path: "/participant/view-event", label: "Xem sự kiện" },
    { path: "/participant/register", label: "Đăng ký sự kiện" },
    { path: "/participant/payment", label: "Thanh toán" },
    { path: "/participant/cancel-ticket", label: "Hủy vé" },
    { path: "/participant/transfer-ticket", label: "Chuyển vé" },
    { path: "/participant/survey", label: "Khảo sát" },
  ],
  marketing: [
    { path: "/marketing/dashboard", label: "Dashboard" },
    { path: "/marketing/content", label: "Nội dung" },
  ],
  customer: [
  { path: "/customer/dashboard", label: "Dashboard" },
  { path: "/customer/view-event", label: "Xem sự kiện" },
  { path: "/customer/participant-list", label: "Danh sách tham gia" },
  { path: "/customer/progress", label: "Tiến độ" },
  { path: "/customer/report", label: "Báo cáo" },
],
};

const Sidebar = ({ role }) => {
  const location = useLocation();
  const links = menus[role] || [];

  return (
    <div
      style={{
        width: SIDEBAR_WIDTH,
        minHeight: "100vh",
        background: BG,
        borderRight: `1px solid ${BORDER}`,
        display: "flex",
        flexDirection: "column",
        fontFamily: FONT,
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: "64px",
          borderBottom: `1px solid ${BORDER}`,
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            background: "linear-gradient(135deg,#4f46e5,#6366f1)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "700",
          }}
        >
          VS
        </div>

        <div>
          <div style={{ fontWeight: 700, fontSize: "14px", color: TEXT }}>
            Hệ thống sự kiện
          </div>
          <div style={{ fontSize: "11px", color: TEXT_MUTED }}>
            VietSky
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav
        style={{
          padding: "10px",
          flex: 1,
          overflowY: "auto",
        }}
      >
        {links.map((link, i) => {
          const isActive = location.pathname === link.path;
          const icon = menuIcons[link.label] || "•";

          return (
            <Link
              key={i}
              to={link.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                marginBottom: "4px",
                borderRadius: "10px",
                textDecoration: "none",
                color: isActive ? "#2563eb" : TEXT_MUTED,
                background: isActive ? "#eef2ff" : "transparent",
                fontWeight: isActive ? 600 : 500,
                transition: "0.2s",
              }}
            >
              <span
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "7px",
                  background: "#f0f0f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {icon}
              </span>

              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "12px" }}>
        <button
          onClick={() => {
            localStorage.removeItem("currentUser");
            window.location.href = "/login";
          }}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            background: "#fff1f2",
            color: "#e11d48",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
