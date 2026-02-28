import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const pageTitles = {
    "/participant/dashboard": "Trang chủ",
    "/participant/search-event": "Tìm sự kiện",
  };

  const title = pageTitles[location.pathname] || "Trang chủ";

  const initials = (user?.name || "U")
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
        borderBottom: "1px solid #eef0f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Left */}
      <h2
        style={{
          margin: 0,
          fontSize: "18px",
          fontWeight: 700,
          color: "#1c1c2e",
        }}
      >
        {title}
      </h2>

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
          Xin chào, <b>{user?.name || "Bạn"}</b>
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