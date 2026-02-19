import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <Sidebar role={user?.role} />

      <div style={{ flex: 1 }}>
        <Header />

        <div style={{ padding: "24px", background: "#f3f4f6", minHeight: "100vh" }}>
          {children}
        </div>
      </div>

    </div>
  );
};

export default MainLayout;
