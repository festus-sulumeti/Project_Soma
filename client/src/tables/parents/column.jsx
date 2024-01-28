import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BASE_URL } from "@/lib/utils";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

const deleteParent = (id) => {
  try {
    axios
      .delete(`${BASE_URL}/remove_parent/${id}`)
      .then((response) => toast.success(response.data.message));
  } catch (err) {
    toast.error("Error during deletion");
    console.error("Error during deletion:", err.message);
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
    id: "actions",
    cell: ({ row }) => {
      const parent = row.original;

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
              onClick={() => deleteParent(parent.id)}
              className="text-red-600"
            >
              <DeleteOutlined className="mr-2 h-4 w-4" /> Delete parent
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
