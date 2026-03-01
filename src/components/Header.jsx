import { useLocation } from "react-router-dom";

const pageLabels = {
  "/director/dashboard":    { title: "Trang chủ"},
  "/director/approve-plan": { title: "Phê duyệt kế hoạch"},
  "/director/view-report":  { title: "Xem báo cáo"},

  "/manager/dashboard":      { title: "Trang chủ"},
  "/manager/create-event":   { title: "Quản lý sự kiện"},
  "/manager/assign-task":    { title: "Phân công"},
  "/manager/approve-script": { title: "Duyệt kịch bản"},
  "/manager/progress":       { title: "Tiến độ"},
  "/manager/view-report":    { title: "Báo cáo"},

  "/staff/dashboard":        { title: "Trang chủ"},
  "/staff/attendance":       { title: "Điểm danh"},
  "/staff/create-script":    { title: "Tạo kịch bản"},
  "/staff/equipment":        { title: "Thiết bị"},
  "/staff/participant-list": { title: "Danh sách tham dự"},
  "/staff/report":           { title: "Báo cáo"},
  "/staff/view-event":       { title: "Chi tiết sự kiện"},

  "/participant/dashboard":       { title: "Trang chủ"},
  "/participant/search-event":    { title: "Tìm sự kiện"},
  "/participant/view-history":    { title: "Lịch sử đăng ký"},
  "/participant/register":        { title: "Đăng ký sự kiện"},
  "/participant/payment":         { title: "Thanh toán"},
  "/participant/cancel-ticket":   { title: "Hủy vé"},
  "/participant/transfer-ticket": { title: "Chuyển vé"},
  "/participant/survey":          { title: "Khảo sát"},

  "/marketing/dashboard": { title: "Trang chủ"},
  "/marketing/content":   { title: "Nội dung"},

  "/customer/dashboard": { title: "Dashboard"},
};

const Header = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const page =
    pageLabels[location.pathname] || {
      title: "Dashboard",
      sub: "Hệ thống quản lý sự kiện",
    };

  // ✅ SỬA Ở ĐÂY
  const displayName = user?.username || "Bạn";

  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
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
      }}
    >
      {/* Left */}
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "17px",
            fontWeight: 700,
            color: "#1c1c2e",
            letterSpacing: "-0.3px",
            lineHeight: 1.25,
          }}
        >
          {page.title}
        </h2>
        <p style={{ margin: 0, fontSize: "12px", color: "#9090a8" }}>
          {page.sub}
        </p>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            padding: "6px 12px",
            background: "#f5f6fb",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#55557a",
          }}
        >
          Xin chào, <b>{displayName}</b>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#f5f6fb",
            padding: "5px 12px 5px 6px",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {initials}
          </div>

          <span style={{ fontSize: "13px", fontWeight: 600 }}>
            {user?.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;