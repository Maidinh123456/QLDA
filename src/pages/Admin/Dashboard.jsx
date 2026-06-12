import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { users as mockUsers } from "../../mockData";

const AdminDashboard = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const mergedUsers = [
      ...mockUsers.filter(mu => !localUsers.some(lu => lu.username === mu.username)),
      ...localUsers,
    ];
    setUserList(mergedUsers);
  }, []);

  // Lọc bỏ admin
  const filteredUsers = userList.filter(u => u.role.toLowerCase() !== "admin");

  return (
    <MainLayout role="admin">
      <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", color:"#0f172a", padding:"0 0 40px" }}>

        {/* PAGE TITLE */}
        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{
              width:48, height:48, borderRadius:14, flexShrink:0,
              background:"linear-gradient(135deg,#6366f1,#0891b2)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:22, boxShadow:"0 6px 18px rgba(99,102,241,.3)"
            }}>👥</div>
            <div>
              <h1 style={{ fontSize:24, fontWeight:900, color:"#0f172a", margin:0, letterSpacing:"-.03em" }}>Admin Dashboard</h1>
              <p style={{ fontSize:13, color:"#94a3b8", margin:"3px 0 0", fontWeight:500 }}>Danh sách người dùng hệ thống (không hiển thị admin)</p>
            </div>
          </div>
        </div>

        {/* USER GRID */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",
          gap:16
        }}>
          {filteredUsers.map(u => (
            <div key={u.id} style={{
              background:"linear-gradient(135deg, #fef3c7, #fde68a)",
              borderRadius:16,
              padding:16,
              boxShadow:"0 4px 12px rgba(0,0,0,0.08)",
              transition:"transform 0.2s, box-shadow 0.2s",
              cursor:"default"
            }}
            onMouseEnter={e => e.currentTarget.style.transform="translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}
            >
              <div style={{ fontWeight:700, fontSize:16, color:"#1e293b" }}>{u.username}</div>
              <div style={{ fontSize:13, color:"#475569", marginTop:4 }}>Role: {u.role}</div>
            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
};

export default AdminDashboard;