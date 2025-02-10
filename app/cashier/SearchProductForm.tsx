"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchProductSchema, searchProductSchema } from "@/lib/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCashierProductStore } from "@/providers/CashierProductProvider";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { CategoryResponse } from "@/types/api-response/categoryType";
import { ErrorResponse } from "@/types/api-response/ErrorResponse";
import { Search } from "lucide-react";

export default function SearchProductForm() {
  const { setQueryParams } = useCashierProductStore((state) => state);
  const { data: categories } = useSWR<CategoryResponse, ErrorResponse>(
    "/api/products/list-categories",
    fetcher
  );

  const form = useForm<SearchProductSchema>({
    resolver: zodResolver(searchProductSchema),
    defaultValues: {
      query: "",
      category: "all",
      sortBy: "name",
      order: "asc",
    },
  });

  function onSubmit(data: SearchProductSchema) {
    try {
      setQueryParams(data.query, data.category, data.sortBy, data.order, 1);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-1 flex flex-wrap gap-3 justify-between"
      >
        <div className="flex gap-2 items-center w-full md:max-w-[400px]">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Search product"
                    className="bg-background"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <Search />
          </Button>
        </div>
        <div className="flex gap-2 w-full md:w-max items-center xl:justify-end">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full md:w-max md:min-w-[100px]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue
                        placeholder="Select a category"
                        className="bg-background"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {categories?.data?.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sortBy"
            render={({ field }) => (
              <FormItem className="w-full md:w-max md:min-w-[100px]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue
                        placeholder="Select a sort by"
                        className="bg-background"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="stock">Stock</SelectItem>
                    <SelectItem value="created_at">Time Created</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-background min-w-[80px]">
                      <SelectValue
                        placeholder="Select a order"
                        className="bg-background"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="asc">A-Z</SelectItem>
                    <SelectItem value="desc">Z-A</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
