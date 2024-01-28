import TeacherAccountForm from "@/components/TeacherAccountForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { BASE_URL } from "@/lib/utils";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { ArrowUpDown, LucideUserCog2, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

const deleteTeacher = (id) => {
  try {
    axios
      .delete(`${BASE_URL}/teacher/${id}`)
      .then((response) => toast.success(response.data.message));
  } catch (err) {
    toast.error("Error during login");
    console.error("Error during login:", err);
  }
};

export const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const teacher = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DialogTrigger>
                <DropdownMenuItem className="cursor-pointer">
                  <LucideUserCog2 className="mr-2 w-4 h-4" />
                  Update teacher
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteTeacher(teacher.id)}
                className="text-red-600 cursor-pointer"
              >
                <DeleteOutlined className="mr-2 h-4 w-4" /> Delete teacher
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <TeacherAccountForm defaultValues={teacher} isPatch />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
