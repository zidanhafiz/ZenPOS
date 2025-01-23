"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { isSubmitting, errors },
  } = form;
  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    try {
      const formData = new FormData();

      formData.append("email", data.email);
      formData.append("password", data.password);

      const res = await login(formData);

      if (!res.success) {
        throw Error(res.data);
      }

      router.push("/");
    } catch (error) {
      console.error(error);
      form.setError("root", {
        message:
          (error as { message?: string })?.message ?? "Something went wrong",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login first before continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="m@email.com"
                            type="email"
                            required
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="********"
                            type={showPassword ? "text" : "password"}
                            required
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between w-full">
                    <Link
                      href="/forgot-password"
                      className="text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                    <div className="flex items-center gap-2 justify-end">
                      <Checkbox
                        id="show-password"
                        checked={showPassword}
                        onCheckedChange={() => setShowPassword(!showPassword)}
                      />
                      <label htmlFor="show-password" className="text-sm">
                        Show password
                      </label>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                  {errors.root && (
                    <FormMessage className="text-center">
                      {errors.root.message}
                    </FormMessage>
                  )}
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
