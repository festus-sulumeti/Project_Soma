import { useAuthStore } from "@/store/authStore";

import AccountSummary from "@/components/AccountSummary";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { UserAddOutlined } from "@ant-design/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateAccount from "@/components/CreateAccount";


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
        <Dialog>
          <DialogTrigger>
            <Button className="mt-4">
              <UserAddOutlined className="mr-2 w-4 h-4" /> Add child
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CreateAccount/>
          </DialogContent>
        </Dialog>
        <AccountSummary />
      </div>
    </div>
  );
};

export default Dashboard;
