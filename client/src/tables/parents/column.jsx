import ParentAccountForm from "@/components/ParentAccountForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BASE_URL } from "@/lib/utils";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { ArrowUpDown, LucideUserCog2, MoreHorizontal } from "lucide-react";
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
                  Update Parent
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteParent(parent.id)}
                className="text-red-600 cursor-pointer"
              >
                <DeleteOutlined className="mr-2 h-4 w-4" /> Delete parent
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <ParentAccountForm defaultValues={parent} isPatch />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
