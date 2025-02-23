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
import {
  updateUserPasswordSchema,
  UpdateUserPasswordSchema,
} from "@/lib/schemas";
import { updateUserPassword } from "@/actions/auth";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<UpdateUserPasswordSchema>({
    resolver: zodResolver(updateUserPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const {
    formState: { isSubmitting, errors },
  } = form;
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: UpdateUserPasswordSchema) => {
    try {
      const formData = new FormData();

      formData.append("newPassword", data.newPassword);
      formData.append("confirmPassword", data.confirmPassword);

      const res = await updateUserPassword(formData);

      if (!res.success) {
        throw Error(res.data ?? "Something went wrong");
      }

      toast({
        title: "Password updated successfully",
        description: "Password has been updated successfully",
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
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter New Password"
                        required
                        disabled={isSubmitting}
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Confirm Password"
                        required
                        disabled={isSubmitting}
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-2">
                <Checkbox
                  id="show-password"
                  checked={showPassword}
                  onCheckedChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="show-password" className="text-sm">
                  Show password
                </label>
              </div>
              <div className="flex gap-2 justify-end mt-6">
                <DiscardAlertDialog onDiscard={onDiscard}>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </DiscardAlertDialog>
                <Button type="submit" disabled={isSubmitting}>
                  Update Password
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
