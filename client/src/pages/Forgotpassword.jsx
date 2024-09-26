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
import { toast } from "sonner";
import { useState } from "react";
import { BASE_URL } from "@/lib/utils";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const forgotPasswordSchema = z
    .object({
      email: z.string().email({ message: "Invalid email address" }),
    })
    .required();

  const forgotPasswordForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/parents/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Password reset link sent to your email", {
          position: "top-right",
          icon: <CheckCircleIcon className="mr-2 h-4 w-4 text-green-600" />,
        });
      } else {
        toast.error(`Failed to send reset link: ${data.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 sm:text-3xl">Forgot Password</h1>
      <Form {...forgotPasswordForm}>
        <form
          onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-md px-4 mt-8"
        >
          <FormField
            control={forgotPasswordForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4" />}
            Send Reset Link
          </Button>
        </form>
      </Form>
      <Button asChild variant="link" className="mt-4">
        <Link to="/parents/login">Back to Login</Link>
      </Button>
    </div>
  );
};

export default ForgotPassword;
