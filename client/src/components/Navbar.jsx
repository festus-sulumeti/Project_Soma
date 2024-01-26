import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "./ui/button";

const Navbar = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  return (
    <div className="py-4 px-14 flex items-center justify-between border-b border-b-gray-300">
      <Logo />
      <div className="flex items-center gap-[10px]">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer font-bold">
                <AvatarImage src="" />
                <AvatarFallback>
                  {/* {user.name.split(" ").map((a) => a.charAt(0))} */}
                  {user.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="*:cursor-pointer">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                <DashboardOutlined className="mr-2 w-4 h-4" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                }}
              >
                <LogoutOutlined className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button asChild variant="default">
              <Link to={"/login"}>
                <UserOutlined className="mr-2 w-4 h-4" />
                Login
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
