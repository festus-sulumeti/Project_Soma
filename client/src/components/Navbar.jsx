import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";
import {
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "./ui/button";

const Navbar = () => {
  const { user, logOut } = useAuthStore();

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
                  {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="*:cursor-pointer">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <ProfileOutlined className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Feedback</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={() => {
                logOut()
                localStorage.removeItem("session");
                }}>
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
