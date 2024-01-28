import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BASE_URL, api } from "@/lib/utils";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const createStudentAccountSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  class_name: z.string({
    required_error: "Please select a class",
    invalid_type_error: "Please select a valid class",
  }),
  parent_id: z.string(),
  gender: z.nativeEnum(["female", "male"], {
    errorMap: (issue, ctx) => {
      return { message: "Please select the gender" };
    },
  }),
});

const StudentAccountForm = ({
  refetch,
  defaultValues = {
    first_name: "",
    last_name: "",
    class_name: "",
    gender: "",
    parent_id: "",
  },
  isPatch,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(createStudentAccountSchema),
    defaultValues,
  });

  function onSubmit(values) {
    setIsLoading(true);
    values["parent_id"] = parseInt(values["parent_id"]);
    try {
      if (!isPatch) {
        api.post(`${BASE_URL}/students`, values).then((response) => {
          toast.success("Student created successfully");
          setIsLoading(false);
          refetch();
          form.reset();
        });
      } else {
        api
          .patch(`${BASE_URL}/students/${defaultValues.id}`, values)
          .then((response) => {
            toast.success("Student updated successfully");
            setIsLoading(false);
            refetch();
            form.reset();
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[28px] font-bold">
        {!isPatch ? "Create a new student account" : "Update existing account"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-[450px] mt-8"
        >
          <div className="flex items-center gap-8">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="class_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class name</FormLabel>
                <FormControl>
                  <Input placeholder="Grade 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parent_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent ID</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-start">
            <Button type="submit" disabled={isLoading}>
              {" "}
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {!isPatch ? "Create account" : "Update account"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StudentAccountForm;
