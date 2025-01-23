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
import { registerSchema, RegisterSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { signup } from "@/actions/auth";
import { useRouter } from "next/navigation";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    formState: { isSubmitting, errors },
    setError,
  } = form;
  const router = useRouter();

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const formData = new FormData();

      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);

      const res = await signup(formData);

      if (!res.success) {
        throw Error(res.data);
      }

      router.push(`/register/verify?userId=${res.data}`);
    } catch (error) {
      console.error(error);
      setError("root", {
        message:
          (error as { message?: string })?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Account</CardTitle>
          <CardDescription>Register your new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="flex gap-3 w-full">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="grid gap-2 w-full">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
                              type="text"
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
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="grid gap-2 w-full">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Doe"
                              type="text"
                              required
                              disabled={isSubmitting}
                              {...field}
                            />
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
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Confirm Password</FormLabel>
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
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    Create Account
                  </Button>
                  {errors.root && (
                    <FormMessage className="text-center">
                      {errors.root.message}
                    </FormMessage>
                  )}
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Sign in
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
