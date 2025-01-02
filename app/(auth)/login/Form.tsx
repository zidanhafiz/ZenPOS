"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchema } from "@/lib/schemas/auth";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: LoginSchema) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div
      className={cn(className, "w-full")}
      {...props}
    >
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid gap-y-2'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='john@doe.com'
                    type='email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='********'
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between items-end'>
            <Link
              className='text-xs text-gray-500 underline'
              href='/forgot-password'
            >
              Forgot password?
            </Link>
            <div className='flex items-center space-x-2 mt-2 ml-auto'>
              <Checkbox
                id='show-password'
                checked={showPassword}
                onCheckedChange={() => setShowPassword(!showPassword)}
              />
              <label
                htmlFor='show-password'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Show password
              </label>
            </div>
          </div>
          <div className='flex flex-col gap-2 mt-6 mb-8 items-center'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full'
            >
              Login
            </Button>
            <p className='text-sm text-gray-500 mt-2'>
              Don&apos;t have an account?{" "}
              <Link
                href='/signup'
                className='text-primary underline font-medium'
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
