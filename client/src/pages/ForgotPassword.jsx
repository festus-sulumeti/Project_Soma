"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/lib/utils";

const formSchema = z.object({
  Email: z
    .string()
    .email({
      message: "Invalid email format",
    })
    .refine((value) => value.includes("@"), {
      message: "Email must contain the @ symbol",
    }),
});

export default function ForgotPassword() {
  const form = useForm();

  function onSubmit(values) {
    try {
      fetch(`${BASE_URL}/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (Response.ok) {
        toast.success("Password reset email sent successfully!");
      } else {
        toast.error("Failed to send password reset email.");
      }
    } catch (error) {
      toast.error("Error resetting password.Please try again later");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                We will send a new password to your email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
