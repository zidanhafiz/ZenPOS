"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  uploadProductImageSchema,
  UploadProductImageSchema,
} from "@/lib/schemas";
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

export function UploadProductImageForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<UploadProductImageSchema>({
    resolver: zodResolver(uploadProductImageSchema),
    defaultValues: {
      image: "",
    },
  });
  const {
    formState: { isSubmitting, errors },
  } = form;
  const router = useRouter();

  const onSubmit = async (data: UploadProductImageSchema) => {
    try {
      const formData = new FormData();

      formData.append("image", data.image);

      // const res = null;

      // if (!res.success) {
      //   throw Error(res.data);
      // }

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Product Image"
                      type="file"
                      required
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Save
            </Button>
            {errors.root && (
              <FormMessage className="text-center">
                {errors.root.message}
              </FormMessage>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
