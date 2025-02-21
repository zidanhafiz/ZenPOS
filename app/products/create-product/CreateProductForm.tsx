"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { createProductSchema } from "@/lib/schemas";
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
import BackNavigation from "../BackNavigation";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import ImagePreview from "@/components/ImagePreview";
import { createProduct } from "@/actions/products";
import { useToast } from "@/hooks/use-toast";
import DiscardAlertDialog from "@/components/DiscardAlertDialog";
import CategorySelect from "../CategorySelect";

const formSchema = createProductSchema.extend({
  image:
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(File)
          .refine((file) => file.size < 5000000, {
            message: "File can't be bigger than 5MB.",
          })
          .refine(
            (file) =>
              ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
            {
              message: "File format must be either jpg, jpeg or png.",
            }
          ),
});

export function CreateProductForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      image: undefined,
    },
  });
  const {
    formState: { isSubmitting, errors },
  } = form;
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("stock", data.stock.toString());
      formData.append("category", data.category);
      formData.append("image", data.image);

      const res = await createProduct(formData);

      if (!res.success) {
        throw Error(res.data ?? "Something went wrong");
      }

      toast({
        title: "Product created successfully",
        description: "Product has been created successfully",
      });

      router.push("/products");
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
    router.push("/products");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <BackNavigation />
        </CardHeader>
        <CardContent>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-6 items-center">
                    <ImagePreview image={form.watch("image")} />
                    <FormField
                      control={form.control}
                      name="image"
                      render={({
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <FormItem className="grid gap-2 w-full">
                          <FormLabel>Product Image</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              required
                              disabled={isSubmitting}
                              {...fieldProps}
                              accept="image/png, image/jpeg, image/jpg"
                              onChange={(event) =>
                                onChange(
                                  event.target.files && event.target.files[0]
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="grid gap-2 w-full">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Product Name"
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
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter Product Description"
                              required
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <CategorySelect form={form} />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Product Price"
                              className="w-full md:w-52"
                              type="number"
                              required
                              disabled={isSubmitting}
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(parseInt(value));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Product Stock"
                              type="number"
                              className="w-full md:w-52"
                              required
                              disabled={isSubmitting}
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(parseInt(value));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
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
                    Create Product
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
    </div>
  );
}
