import "./style.scss";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "@/firebase/AuthProvider";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const LoadingSpinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin")}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

const loginSchema = z.object({
  email: z.string().email({ message: "Please fill the email!" }),
  password: z.string().min(1, {
    message: "Please fill the password!",
  }),
});

const signUpSchema = z.object({
  email: z.string().email({ message: "Please fill the email!" }),
  username: z.string().min(1, { message: "Please fill the email!" }),
  password: z.string().min(4, {
    message: "min. 4 characters",
  }),
});

function LoginForm({ authFn }: { authFn: () => void }) {
  const { signIn } = useContext(AuthContext);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmitLogin(values: z.infer<typeof loginSchema>) {
    try {
      const { email, password } = values;
      toast(
        <>
          <LoadingSpinner />
          {"Loading...."}
        </>,
        { position: "top-center", duration: 500 }
      );
      await signIn(email, password);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <>
      <h1>Sign In</h1>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmitLogin)}>
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="form-field">
                <FormLabel className="form-label">email</FormLabel>
                <FormControl>
                  <Input className="form-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="form-field">
                <FormLabel className="form-label">Password</FormLabel>
                <FormControl>
                  <Input className="form-input" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="changetype-row">
            <span>New Account?</span>
            <Button variant={"link"} type="button" onClick={() => authFn()}>
              Sign Up
            </Button>
          </div>
          <Button type="submit" className="submit-button">
            Sign In
          </Button>
        </form>
      </Form>
    </>
  );
}

function SignUpForm({ authFn }: { authFn: () => void }) {
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signUp } = useContext(AuthContext);

  async function onSubmitSignUp(values: z.infer<typeof signUpSchema>) {
    try {
      const { email, password } = values;
      toast(
        <>
          <LoadingSpinner />
          {"Loading...."}
        </>,
        { position: "top-center", duration: 500 }
      );
      await signUp(email, password);
    } catch (error) {
      toast(`Sign-up error: ${error}`);
    }
  }

  return (
    <>
      <h1>Sign Up</h1>
      <Form {...signUpForm}>
        <form onSubmit={signUpForm.handleSubmit(onSubmitSignUp)}>
          <FormField
            control={signUpForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="form-field">
                <FormLabel className="form-label">email</FormLabel>
                <FormControl>
                  <Input className="form-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="form-field">
                <FormLabel className="form-label">Password</FormLabel>
                <FormControl>
                  <Input className="form-input" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="changetype-row">
            <span>Has Account?</span>
            <Button variant={"link"} onClick={() => authFn()} type="button">
              Sign In
            </Button>
          </div>
          <Button type="submit" className="submit-button">
            Sign Up
          </Button>
        </form>
      </Form>
    </>
  );
}

export default function Auth() {
  const [currAuth, setAuth] = useState<"login" | "signup">("login");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  if (user) navigate("/");

  const handleChangeAuth = () => {
    if (currAuth === "login") {
      setAuth("signup");
    } else {
      setAuth("login");
    }
  };

  return (
    <>
      <div className="auth-container">
        {currAuth === "login" ? (
          <LoginForm authFn={handleChangeAuth} />
        ) : (
          <SignUpForm authFn={handleChangeAuth} />
        )}
      </div>
    </>
  );
}
