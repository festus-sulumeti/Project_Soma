import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useAccountStore } from "@/store/accountsStore";

import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { BASE_URL } from "@/lib/utils";

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
  parent_id: z.number().int().positive({
    message: "Parent ID must be a positive number",
  }),
  gender: z.nativeEnum(["Female", "Male"], {
    errorMap: (issue, ctx) => {
      return { message: "Please select the gender" };
    },
  }),
});

const StudentAccountForm = () => {
  const [classes] = useAccountStore((state) => [state.classes]);
  const [isLoading, setIsLoading] = useState(false);

  const parents = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Boe",
    },
  ];

  const form = useForm({
    resolver: zodResolver(createStudentAccountSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      class_name: "",
      gender: "",
      parent_id: 2,
    },
  });

  function onSubmit(values) {
    setIsLoading(true);
    try {
      axios.post(`${BASE_URL}/students`, values).then((response) => {
        toast.success(response.data.message);
        setIsLoading(false);
        form.reset();
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[28px] font-bold">Create a new student account</h1>
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
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
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
                <FormLabel>Class</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {classes.map(({ id, name }) => (
                      <SelectItem key={id} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parent_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={2}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a parent" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {parents.map(({ id, first_name, last_name }) => (
                      <SelectItem key={id} value={parseInt(id)}>
                        {first_name} {last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-start">
            <Button type="submit" disabled={isLoading}>
              {" "}
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>} Create an account
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StudentAccountForm;
