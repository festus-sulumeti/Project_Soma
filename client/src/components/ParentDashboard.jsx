import { useAuthStore } from "@/store/authStore";
import React from "react";

import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAddOutlined } from "@ant-design/icons";

const ParentDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-[36px]">Dashboard</h1>
        <h2 className="font-semibold text-[19px]">Welcome, {user.name}</h2>
      </div>
      <Button className="mt-4 float-right">
        <UserAddOutlined className="mr-2 w-4 h-4" /> Add child
      </Button>
      <Tabs defaultValue="account" className="w-[400px] mt-16">
        <TabsList>
          <TabsTrigger value="chart">Chart</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="feedback">Feeback</TabsTrigger>
        </TabsList>
        <TabsContent value="chart">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="table">Change your password here.</TabsContent>
        <TabsContent value="feedback">Send your feedback here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentDashboard;
