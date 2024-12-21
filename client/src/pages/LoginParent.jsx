import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { CheckCircleIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { BASE_URL } from "@/lib/utils";
import { useState } from "react";

const LoginParent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
      }),
    })
    .required();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/parents/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user_email);
        localStorage.setItem("role", data.role);

        console.log(data);
        toast.success("Login successful", {
          position: "top-right",
          icon: <CheckCircleIcon className="mr-2 h-4 w-4 text-green-600" />,
        });
      } else {
        toast.error(`Login failed: ${data.message}`);
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-[28px] font-bold mb-6 text-center">Login into your account as a Parent</h1>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-md bg-white"
        >
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    {...field}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="strong-password"
                    {...field}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-start">
            <Button asChild variant="link">
              <Link to={"/forgot-password"} className="text-sm  hover:underline">
                Forgot password?
              </Link>
            </Button>
            <Button type="submit" disabled={isLoading} className="w-full mt-4 py-3 text-white rounded-md">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login as Parent
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginParent;
