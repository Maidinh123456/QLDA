import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { users as mockUsers } from "../../mockData";

const AdminUser = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ username: "", role: "", password: "" });

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const mergedUsers = [
      ...mockUsers.filter(mu => !localUsers.some(lu => lu.username === mu.username)),
      ...localUsers,
    ];
    setUserList(mergedUsers);
  }, []);

  const handleAddUser = () => {
    setFormData({ username: "", role: "", password: "" });
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setFormData({ ...user });
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDeleteUser = (user) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      const updated = userList.filter(u => u.id !== user.id);
      setUserList(updated);
      localStorage.setItem("users", JSON.stringify(updated));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.role || !formData.password) return;

    let updatedList;
    if (selectedUser) {
      updatedList = userList.map(u => u.id === selectedUser.id ? formData : u);
    } else {
      const newUser = { ...formData, id: Date.now() };
      updatedList = [...userList, newUser];
    }
    setUserList(updatedList);
    localStorage.setItem("users", JSON.stringify(updatedList));
    setShowForm(false);
  };
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
            }}>👤</div>
            <div>
              <h1 style={{ fontSize:24, fontWeight:900, color:"#0f172a", margin:0, letterSpacing:"-.03em" }}>Admin Dashboard</h1>
              <p style={{ fontSize:13, color:"#94a3b8", margin:"3px 0 0", fontWeight:500 }}>Quản lý người dùng hệ thống</p>
            </div>
          </div>
        </div>

        {/* ADD USER BUTTON */}
        <div style={{ marginTop:20, marginBottom:16 }}>
          <button 
            onClick={handleAddUser} 
            style={{
              padding:"10px 18px", borderRadius:12, border:"none",
              background:"#6366f1", color:"#fff", fontWeight:600,
              cursor:"pointer"
            }}
          >
            + Thêm người dùng
          </button>
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
              <div style={{ display:"flex", gap:8, marginTop:12 }}>
                <button onClick={()=>handleEditUser(u)} style={{ flex:1, padding:"6px 0", borderRadius:8, border:"none", background:"#fbbf24", color:"#fff", cursor:"pointer" }}>Sửa</button>
                <button onClick={()=>handleDeleteUser(u)} style={{ flex:1, padding:"6px 0", borderRadius:8, border:"none", background:"#ef4444", color:"#fff", cursor:"pointer" }}>Xóa</button>
              </div>
            </div>
          ))}
        </div>

        {/* Form Modal */}
        {showForm && (
          <div style={{
            position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,.3)",
            display:"flex", justifyContent:"center", alignItems:"center", zIndex:999
          }}>
            <div style={{ background:"#fff", borderRadius:16, padding:24, width:320, boxShadow:"0 4px 24px rgba(0,0,0,.15)" }}>
              <h2 style={{ margin:0, marginBottom:12, fontSize:18 }}>{selectedUser ? "Sửa người dùng" : "Thêm người dùng"}</h2>
              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={formData.username} 
                  onChange={e=>setFormData({...formData, username:e.target.value})} 
                  style={{ padding:10, borderRadius:8, border:"1.5px solid #e5e7eb" }}
                />
                <input 
                  type="text" 
                  placeholder="Role" 
                  value={formData.role} 
                  onChange={e=>setFormData({...formData, role:e.target.value})} 
                  style={{ padding:10, borderRadius:8, border:"1.5px solid #e5e7eb" }}
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={formData.password} 
                  onChange={e=>setFormData({...formData, password:e.target.value})} 
                  style={{ padding:10, borderRadius:8, border:"1.5px solid #e5e7eb" }}
                />
                <div style={{ display:"flex", gap:8 }}>
                  <button type="submit" style={{ flex:1, padding:10, borderRadius:8, border:"none", background:"#10b981", color:"#fff", cursor:"pointer" }}>Xác nhận</button>
                  <button type="button" onClick={()=>setShowForm(false)} style={{ flex:1, padding:10, borderRadius:8, border:"none", background:"#9ca3af", color:"#fff", cursor:"pointer" }}>Hủy</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default AdminUser;