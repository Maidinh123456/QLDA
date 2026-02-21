import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar role={user?.role} />

      <div style={{ flex: 1 }}>
        <Header />

        <div
          style={{
            padding: "24px",
            background: "#f3f4f6",
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;