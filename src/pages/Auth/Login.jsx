import React, { useState } from "react";
import { users } from "../../mockData";
import { useNavigate } from "react-router-dom";

// Add to index.html:
// <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const user = users.find(
        (u) => u.name.toLowerCase() === name.trim().toLowerCase() && u.password === password
      );
      if (!user) { setError("Sai tên đăng nhập hoặc mật khẩu!"); setLoading(false); return; }
      localStorage.setItem("currentUser", JSON.stringify(user));
      const routes = { director: "/director/dashboard", manager: "/manager/dashboard", staff: "/staff/dashboard", participant: "/participant/dashboard", marketing: "/marketing/dashboard", customer: "/customer/dashboard" };
      navigate(routes[user.role] || "/");
    }, 600);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 50%, #fdf4ff 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Plus Jakarta Sans', sans-serif", padding: "20px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative blobs */}
      <div style={{ position: "fixed", top: "-10%", right: "-5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-10%", left: "-5%", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{
        width: "100%", maxWidth: "420px",
        background: "#ffffff",
        borderRadius: "24px", padding: "48px 40px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.03), 0 20px 60px rgba(99,102,241,0.12)",
        border: "1px solid rgba(99,102,241,0.1)",
        position: "relative",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            width: "56px", height: "56px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            borderRadius: "16px", display: "inline-flex",
            alignItems: "center", justifyContent: "center", marginBottom: "16px",
            boxShadow: "0 8px 24px rgba(99,102,241,0.3)",
          }}>
            <span style={{ fontSize: "24px" }}>✦</span>
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#1e1b4b", margin: 0, letterSpacing: "-0.5px" }}>EventFlow</h1>
          <p style={{ color: "#9ca3af", fontSize: "14px", marginTop: "6px", marginBottom: 0 }}>Đăng nhập vào hệ thống</p>
        </div>

        <form onSubmit={handleSubmit}>
          {[
            { label: "TÊN ĐĂNG NHẬP", placeholder: "Nhập tên đăng nhập", value: name, setter: setName, type: "text" },
            { label: "MẬT KHẨU", placeholder: "Nhập mật khẩu", value: password, setter: setPassword, type: "password" },
          ].map(({ label, placeholder, value, setter, type }) => (
            <div key={label} style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", color: "#6b7280", fontSize: "11px", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.6px" }}>{label}</label>
              <input type={type} value={value} placeholder={placeholder} onChange={(e) => setter(e.target.value)}
                style={{ width: "100%", boxSizing: "border-box", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "12px", padding: "13px 15px", color: "#111827", fontSize: "14px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "border-color 0.2s, box-shadow 0.2s" }}
                onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; e.target.style.background = "#fff"; }}
                onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }}
              />
            </div>
          ))}

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "11px 14px", marginBottom: "18px", color: "#dc2626", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
              ⚠ {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: "100%", background: loading ? "#a5b4fc" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
            border: "none", borderRadius: "12px", padding: "14px",
            color: "#fff", fontSize: "15px", fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: loading ? "none" : "0 4px 14px rgba(99,102,241,0.4)",
            fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "opacity 0.2s",
          }}
            onMouseEnter={(e) => !loading && (e.target.style.opacity = "0.92")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập →"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", color: "#9ca3af", fontSize: "13px", marginBottom: 0 }}>
          Chưa có tài khoản?{" "}
          <a href="/register" style={{ color: "#6366f1", textDecoration: "none", fontWeight: 600 }}>Đăng ký ngay</a>
        </p>
      </div>
    </div>
  );
};

export default Login;