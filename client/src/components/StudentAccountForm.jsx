import React from "react";
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

const createStudentAccountSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  class_id: z.number({
    required_error: "Please select a class",
    invalid_type_error: "Please select a valid class",
  }),
  parent_id: z.optional(z.nullable(z.number())),
  gender: z.nativeEnum(["Female", "Male"], {
    errorMap: (issue, ctx) => {
      return { message: "Please select the gender" };
    },
  }),
});

const StudentAccountForm = () => {
  const classes = [
    {
      id: 1,
      name: "Grade 1",
      teacher_id: 101,
    },
    {
      id: 2,
      name: "Grade 2",
      teacher_id: 102,
    },
  ];

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
      class_id: "",
      parent_id: null,
      gender: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
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
            name="class_id"
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
                      <SelectItem value={id}>{name}</SelectItem>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a parent" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {parents.map(({id, first_name, last_name}) => (
                      <SelectItem value={id}>{first_name} {last_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-start">
            <Button type="submit">Create an account</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StudentAccountForm;
