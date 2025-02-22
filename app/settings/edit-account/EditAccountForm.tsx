"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import DiscardAlertDialog from "@/components/DiscardAlertDialog";
import { editAccountSchema, EditAccountSchema } from "@/lib/schemas";
import { User } from "@/types/user";
import { updateUser } from "@/actions/auth";

export default function EditAccountForm({ user }: { user: User }) {
  const form = useForm<EditAccountSchema>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    },
  });
  const {
    formState: { isSubmitting, errors },
  } = form;
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: EditAccountSchema) => {
    try {
      const formData = new FormData();

      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);

      const res = await updateUser(formData, user.id);

      if (!res.success) {
        throw Error(res.data ?? "Something went wrong");
      }

      toast({
        title: "Account updated successfully",
        description: "Account has been updated successfully",
      });

      router.push("/settings");
    } catch (error) {
      console.error(error);
      form.setError("root", {
        message:
          (error as { message?: string })?.message ?? "Something went wrong",
      });
    }
  };

  const onDiscard = () => {
    form.reset();
    router.push("/settings");
  };

  return (
    <Card className="max-w-xl">
      <CardContent className="mt-6">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter First Name"
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
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Last Name"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Email"
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
              <div className="flex gap-2 justify-end mt-6">
                <DiscardAlertDialog onDiscard={onDiscard}>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={isSubmitting}
                  >
                    Discard
                  </Button>
                </DiscardAlertDialog>
                <Button type="submit" disabled={isSubmitting}>
                  Update Account
                </Button>
              </div>
              {errors.root && (
                <FormMessage className="text-center">
                  {errors.root.message}
                </FormMessage>
              )}
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
