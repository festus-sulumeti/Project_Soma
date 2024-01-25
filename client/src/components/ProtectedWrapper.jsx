import { useAuthStore } from "@/store/authStore";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const ProtectedWrapper = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <div className="px-14">
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedWrapper;
