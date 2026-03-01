import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lấy danh sách user cũ
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra trùng username
    const userExists = users.find(u => u.username === username);
    if (userExists) {
      alert("Tên đăng nhập đã tồn tại!");
      return;
    }

    const newUser = {
      username,
      name,
      email,
      password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess(true);

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: "#f9fafb",
    border: "1.5px solid #e5e7eb",
    borderRadius: "12px",
    padding: "13px 15px",
    color: "#111827",
    fontSize: "14px",
    outline: "none",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: "all 0.2s",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 50%, #fdf4ff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: "20px",
    }}>

      <div style={{ width: "100%", maxWidth: "420px", background: "#ffffff", borderRadius: "24px", padding: "48px 40px", boxShadow: "0 4px 6px rgba(0,0,0,0.03), 0 20px 60px rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.1)" }}>

        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#1e1b4b", margin: 0 }}>
            Tạo tài khoản
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "14px", marginTop: "6px" }}>
            Đăng ký tham gia EventFlow
          </p>
        </div>

        {success ? (
          <div style={{
            textAlign: "center",
            padding: "24px",
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            borderRadius: "12px",
            color: "#059669"
          }}>
            ✓ Đăng ký thành công! Đang chuyển hướng...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>

            {/* USERNAME */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, marginBottom: "8px", display: "block" }}>
                TÊN ĐĂNG NHẬP
              </label>
              <input
                type="text"
                value={username}
                placeholder="Nhập tên đăng nhập"
                onChange={(e) => setUsername(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {/* NAME */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, marginBottom: "8px", display: "block" }}>
                TÊN HIỂN THỊ
              </label>
              <input
                type="text"
                value={name}
                placeholder="Nhập họ và tên"
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {/* EMAIL */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, marginBottom: "8px", display: "block" }}>
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                placeholder="Nhập email"
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {/* PASSWORD */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, marginBottom: "8px", display: "block" }}>
                MẬT KHẨU
              </label>
              <input
                type="password"
                value={password}
                placeholder="Nhập mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <button type="submit" style={{
              width: "100%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "none",
              borderRadius: "12px",
              padding: "14px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: "4px"
            }}>
              Tạo tài khoản →
            </button>
          </form>
        )}

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "13px" }}>
          Đã có tài khoản?{" "}
          <Link to="/login" style={{ color: "#6366f1", fontWeight: 600 }}>
            Đăng nhập
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;