"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema, ForgotPasswordSchema } from "@/lib/schemas/auth";
import Link from "next/link";

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      confirmEmail: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ForgotPasswordSchema) => {
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
            name='confirmEmail'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Email</FormLabel>
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
          <p className='mt-1 text-xs text-muted-foreground'>We will send you an email to reset your password.</p>
          <div className='flex flex-col gap-4 mt-4 mb-8 items-center'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full'
            >
              Send email
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
