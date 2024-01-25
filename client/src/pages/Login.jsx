import { useForm } from "react-hook-form";
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
import { CheckCircleIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { toast } from "sonner";
import { BASE_URL } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const Login = () => {
  const { user, setUser, setIsAuthenticated } = useAuthStore();
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
      axios
        .post("http://localhost:5000/login", values)
        .then((response) => {
          localStorage.setItem("session", JSON.stringify(response.data));
          toast.success("Login successful");
          setIsAuthenticated(true);
          setUser(JSON.parse(localStorage.getItem("session")).user)
          navigate("/dashboard");
    
        })
        .catch((error) => toast.error(error.response.data.message));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };


  return (
    <div className="flex flex-col items-center pl-14">
      <h1 className="text-[28px] font-bold">Login into your account</h1>
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
