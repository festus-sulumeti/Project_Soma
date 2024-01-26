import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const ProtectedWrapper = () => {
  const navigate = useNavigate();

    useEffect(() => {
      if (!localStorage.getItem('token') || !localStorage.getItem('user')) navigate("/login");
    }, []);

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
