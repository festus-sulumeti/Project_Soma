
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
      // Hardcoded credentials
      const hardcodedCredentials = {
        email: "admin@gmail.com",
        password: "password",
      };
  
      // Check if entered credentials match hardcoded ones
      if (
        values.email === hardcodedCredentials.email &&
        values.password === hardcodedCredentials.password
      ) {
        // Simulate a successful login
        const fakeResponse = {
          success: true,
          token: "fake-jwt-token", // Fake token for demo purposes
          user_email: values.email,
        };
  
        localStorage.setItem("token", fakeResponse.token);
        localStorage.setItem("user", fakeResponse.user_email);
  
        console.log(localStorage.getItem("token"));
        // Redirect to dashboard
        navigate("/dashboard");
  
        toast.success("Login successful");
      } else {
        // Invalid credentials
        toast.error("Invalid credentials");
        console.error("Login failed: Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during login");
    }
  };
  

  return (
    <div className="flex flex-col items-center">
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
            <Button type="submit">Login as Admin</Button>
          </div>
        </form>
      </Form>
      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;