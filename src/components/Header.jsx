import { useLocation } from "react-router-dom";

// Thêm vào index.html:
// <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

const pageLabels = {
  "/director/dashboard":    { title: "Dashboard"},
  "/director/approve-plan": { title: "Phê duyệt kế hoạch"},
  "/director/view-report":  { title: "Xem báo cáo"},

  "/manager/dashboard":      { title: "Dashboard"},
  "/manager/create-event":   { title: "Tạo sự kiện"},
  "/manager/assign-task":    { title: "Phân công"},
  "/manager/approve-script": { title: "Duyệt kịch bản"},
  "/manager/progress":       { title: "Tiến độ"},
  "/manager/view-report":    { title: "Báo cáo"},

  "/staff/dashboard":        { title: "Dashboard"},
  "/staff/attendance":       { title: "Điểm danh"},
  "/staff/create-script":    { title: "Tạo kịch bản"},
  "/staff/equipment":        { title: "Thiết bị"},
  "/staff/participant-list": { title: "Danh sách tham dự"},
  "/staff/report":           { title: "Báo cáo"},
  "/staff/view-event":       { title: "Chi tiết sự kiện"},

  "/participant/dashboard":       { title: "Dashboard"},
  "/participant/search-event":    { title: "Tìm sự kiện"},
  "/participant/view-event":      { title: "Xem sự kiện"},
  "/participant/register":        { title: "Đăng ký sự kiện"},
  "/participant/payment":         { title: "Thanh toán"},
  "/participant/cancel-ticket":   { title: "Hủy vé"},
  "/participant/transfer-ticket": { title: "Chuyển vé"},
  "/participant/survey":          { title: "Khảo sát"},

  "/marketing/dashboard": { title: "Dashboard"},
  "/marketing/content":   { title: "Nội dung"},

  "/customer/dashboard": { title: "Dashboard"},
};

const Header = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

  // ✅ Tự động lấy tiêu đề theo route hiện tại
  const page = pageLabels[location.pathname] || { title: "Dashboard", sub: "Hệ thống quản lý sự kiện" };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  const initials = (user?.name || "U")
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <div style={{
      height: "64px",
      background: "#ffffff",
      borderBottom: "1px solid #ebebf0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      gap: "16px",
      position: "sticky",
      top: 0,
      zIndex: 40,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}>

      {/* ── Left: Tên trang động ── */}
      <div>
        <h2 style={{
          margin: 0,
          fontSize: "17px",
          fontWeight: 700,
          color: "#1c1c2e",
          letterSpacing: "-0.3px",
          lineHeight: 1.25,
        }}>
          {page.title}
        </h2>
        <p style={{ margin: 0, fontSize: "12px", color: "#9090a8" }}>
          {page.sub}
        </p>
      </div>

      {/* ── Right ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

        {/* Greet */}
        <div style={{
          background: "#f3f3f8",
          border: "1px solid #ebebf0",
          borderRadius: "10px",
          padding: "6px 13px",
          fontSize: "12.5px",
          color: "#717184",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}>
          Xin chào, <span style={{ color: "#1c1c2e", fontWeight: 600 }}>{user?.name || "Bạn"}</span> 👋
        </div>

        {/* Avatar + role chip */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "#f3f3f8",
          border: "1px solid #ebebf0",
          borderRadius: "12px",
          padding: "4px 12px 4px 5px",
        }}>
          <div style={{
            width: "28px", height: "28px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: "11px", fontWeight: 700,
            flexShrink: 0,
          }}>
            {initials}
          </div>
          <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#1c1c2e" }}>
            {user?.role || "—"}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            height: "36px",
            background: "#fff1f2",
            border: "1px solid #fecdd3",
            borderRadius: "10px",
            padding: "0 16px",
            color: "#e11d48",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            display: "flex", alignItems: "center", gap: "6px",
            transition: "all 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#ffe4e6"; e.currentTarget.style.borderColor = "#fda4af"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#fff1f2"; e.currentTarget.style.borderColor = "#fecdd3"; }}
        >
          ↩ Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Header;