import { BASE_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { columns as studentCols } from "@/tables/students/columns";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronLeftIcon, ChevronRightIcon, RefreshCcw } from "lucide-react";

import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import StudentAccountForm from "./StudentAccountForm";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";

export function StudentAccounts() {
  const [students, setStudents] = useState([]);
  const [renderedData, setRenderedData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  

  useEffect(() => {
    axios.get(`${BASE_URL}/students`).then((response) => {
      setStudents(response.data);
      setRenderedData(response.data);
    });
  }, []);

  const refetchStudents = () => {
    axios.get(`${BASE_URL}/students`).then((response) => {
      setStudents(response.data);
      setRenderedData(response.data);
    });
  };

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [gradeFilter, setGradeFilter] = useState("default");

  useEffect(() => {
    const filteredData = students.filter((student) => {
      if (gradeFilter === "default") return student;

      return student.class_name === gradeFilter;
    });

    setRenderedData(filteredData);
  }, [gradeFilter, students]);


  const table = useReactTable({
    data: renderedData,
    columns: studentCols,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="pt-8">
      <div className="flex items-center justify-between">
        <h1 className="pl-8 text-[22px] font-medium">
          List of student accounts
        </h1>
        <Button
          size="icon"
          onClick={() => {
            setIsFetching(true);
            setTimeout(() => {
              refetchStudents();
              setIsFetching(false);
              toast.success("Student list updated successfully");
            }, 1500);
          }}
        >
          <RefreshCcw className={`h-4 w-4 ${isFetching && "animate-spin"}`} />
        </Button>
      </div>
      <div className="flex items-center justify-between py-4 ml-8">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Filter first name..."
            value={table.getColumn("first_name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("first_name")?.setFilterValue(event.target.value)
            }
            className="w-[270px]"
          />

          <Select
            onValueChange={(event) => setGradeFilter(event)}
            value={gradeFilter}
          >
            <SelectTrigger className="w-[180px] ml-4">
              <SelectValue placeholder="Filter by grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Class</SelectLabel>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="Class B">Class B</SelectItem>
                <SelectItem value="Class A">Class A</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger>
              <Button>
                <UserAddOutlined className="mr-2 w-4 h-4" /> Add account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <StudentAccountForm refetch={refetchStudents} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-md border ml-8 mt-4">
        <Table className="w-[950px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={studentCols.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-center py-4 space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleLeftOutlined className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleRightOutlined className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentAccounts;
