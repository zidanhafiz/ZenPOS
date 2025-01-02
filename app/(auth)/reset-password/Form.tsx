"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema, ResetPasswordSchema } from "@/lib/schemas/auth";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export function ResetPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ResetPasswordSchema) => {
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
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
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
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
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
          <div className='flex flex-col gap-4 mt-4 mb-8 items-center'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full'
            >
              Reset password
            </Button>
            <Link
              href='/login'
              className='text-sm text-primary underline font-medium'
            >
              Back to login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
