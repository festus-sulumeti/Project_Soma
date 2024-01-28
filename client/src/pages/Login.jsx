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
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { toast } from "sonner";
import { BASE_URL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Login = () => {
  const navigate = useNavigate();
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
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      // Handle the response data accordingly
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user_email);

        console.log(localStorage.getItem("token"));
        // Redirect to dashboard
        navigate('/dashboard')

        toast.success("Login successful");
      } else {
        // Login failed, show error toast
        toast.error(`Login failed: ${data.message}`);
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col items-center">
=======
    <div className="flex flex-col items-center pl-14">
      <h1 className="text-[28px] font-bold">Login into your account</h1>
>>>>>>> 0c0aa6a78d3dc05d444553130570eee60dfed2d5
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="space-y-8 w-[450px] mt-8"
        >
          <FormField
            control={loginForm.control}
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-start">
            <Button asChild variant="link">
              <Link to={""}>Forgot password?</Link>
            </Button>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </Form>
      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
