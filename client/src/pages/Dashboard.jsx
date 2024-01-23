import { useAuthStore } from "@/store/authStore";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  const { user } = useAuthStore();

  if(!user)return;

  return (
    <div className="flex items-start">
        <Sidebar />
      <div className="pl-14 flex-1 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-[36px]">Dashboard</h1>
          <h2 className="font-semibold text-[19px]">Welcome, {user.name}</h2>
        </div>
        <Button className="mt-4 float-right">
          <UserAddOutlined className="mr-2 w-4 h-4" /> Add child
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
