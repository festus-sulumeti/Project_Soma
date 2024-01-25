import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "@/lib/utils";
import { toast } from "sonner";

const deleteStudent = (id) => {
  try {
    axios
      .delete(`${BASE_URL}/students/${id}`)
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
    accessorKey: "parent_id",
    header: "Parent ID",
  },
  {
    accessorKey: "class_name",
    header: "Class Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              onClick={() => deleteStudent(student.id)}
              className="text-red-600"
            >
              <DeleteOutlined className="mr-2 h-4 w-4" /> Delete student
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
