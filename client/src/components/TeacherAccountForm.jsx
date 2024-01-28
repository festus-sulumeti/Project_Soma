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
import { BASE_URL, api } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const createTeacherAccountSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  phone_number: z.string().length(10, {
    message: "Phone number must be 10 digits",
  }),
  role: z.string(),
  email: z.string().email(),
  gender: z.enum(["female", "male"]),
});

const TeacherAccountForm = ({
  refetch,
  isPatch,
  defaultValues = {
    first_name: "",
    last_name: "",
    class_name: "",
    gender: "",
    parent_id: "",
  },
}) => {
  const form = useForm({
    resolver: zodResolver(createTeacherAccountSchema),
    defaultValues
  });

  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(values) {
    setIsLoading(true);

    if (!isPatch) {
      api
        .post(`${BASE_URL}/teacher`, values)
        .then((response) => {
          toast.success(response.data.message);
          refetch();
        })
        .then(() => setIsLoading(false));
    } else {
      api
        .patch(`${BASE_URL}/teacher/${defaultValues.id}`, values)
        .then((response) => {
          toast.success("Teacher updated successfully");
          setIsLoading(false);
          refetch();
          form.reset();
        });
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="0712345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="Science teacher" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <div className="flex flex-col items-start">
            <Button disabled={isLoading} type="submit">
              {" "}
              {isLoading && (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              )}{" "}
              {!isPatch ? "Create account" : "Update account"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TeacherAccountForm;
