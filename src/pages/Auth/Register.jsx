import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registered:', { name, email, password });
    setSuccess(true);
    setTimeout(() => navigate('/login'), 1500);
  };

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    background: "#f9fafb", border: "1.5px solid #e5e7eb",
    borderRadius: "12px", padding: "13px 15px",
    color: "#111827", fontSize: "14px", outline: "none",
    fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.2s",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 50%, #fdf4ff 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Plus Jakarta Sans', sans-serif", padding: "20px",
    }}>
      <div style={{ position: "fixed", top: "-10%", left: "-5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: "420px", background: "#ffffff", borderRadius: "24px", padding: "48px 40px", boxShadow: "0 4px 6px rgba(0,0,0,0.03), 0 20px 60px rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", boxShadow: "0 8px 24px rgba(99,102,241,0.3)" }}>
            <span style={{ fontSize: "24px" }}>✦</span>
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#1e1b4b", margin: 0 }}>Tạo tài khoản</h1>
          <p style={{ color: "#9ca3af", fontSize: "14px", marginTop: "6px", marginBottom: 0 }}>Đăng ký tham gia EventFlow</p>
        </div>

        {success ? (
          <div style={{ textAlign: "center", padding: "24px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "12px", color: "#059669" }}>
            ✓ Đăng ký thành công! Đang chuyển hướng...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {[
              { label: "TÊN HIỂN THỊ", placeholder: "Nhập họ và tên", value: name, setter: setName, type: "text" },
              { label: "EMAIL", placeholder: "Nhập địa chỉ email", value: email, setter: setEmail, type: "email" },
              { label: "MẬT KHẨU", placeholder: "Tạo mật khẩu mạnh", value: password, setter: setPassword, type: "password" },
            ].map(({ label, placeholder, value, setter, type }) => (
              <div key={label} style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", color: "#6b7280", fontSize: "11px", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.6px" }}>{label}</label>
                <input type={type} value={value} placeholder={placeholder} onChange={(e) => setter(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; e.target.style.background = "#fff"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }}
                />
              </div>
            ))}
            <button type="submit" style={{ width: "100%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: "12px", padding: "14px", color: "#fff", fontSize: "15px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(99,102,241,0.4)", fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: "4px" }}>
              Tạo tài khoản →
            </button>
          </form>
        )}
        <p style={{ textAlign: "center", marginTop: "24px", color: "#9ca3af", fontSize: "13px", marginBottom: 0 }}>
          Đã có tài khoản? <a href="/login" style={{ color: "#6366f1", textDecoration: "none", fontWeight: 600 }}>Đăng nhập</a>
        </p>
      </div>
    </div>
  );
};

export default Register;