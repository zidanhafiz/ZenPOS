"use client";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import { CategoryResponse } from "@/types/api-response/categoryType";
import { ErrorResponse } from "@/types/api-response/ErrorResponse";
import { useState } from "react";

export default function CategorySelect({
  form,
  className,
}: {
  form: UseFormReturn<any>;
  className?: string;
}) {
  const { data: categories } = useSWR<CategoryResponse, ErrorResponse>(
    "/api/products/list-categories",
    fetcher
  );
  const [open, setOpen] = useState<boolean>(false);

  const [newCategory, setNewCategory] = useState<string | null>(null);

  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem className={cn("grid gap-2", className)}>
          <FormLabel>Category</FormLabel>
          <Popover open={open}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  onClick={() => setOpen(!open)}
                  className={cn(
                    "w-full md:w-72 justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? categories?.data?.find(
                        (category) => category === field.value
                      ) || field.value
                    : "Select category"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] md:w-72 p-0">
              <Command>
                <CommandInput
                  placeholder="Search category..."
                  className="h-9"
                  onInput={(e) => {
                    setNewCategory(e.currentTarget.value);
                  }}
                />
                <CommandList>
                  <CommandEmpty className="p-1">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full text-start"
                      onClick={() => {
                        form.setValue("category", newCategory);
                        setNewCategory(null);
                        setOpen(false);
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      Add new {newCategory}
                    </Button>
                  </CommandEmpty>
                  <CommandGroup>
                    {categories?.data?.map((category) => (
                      <CommandItem
                        value={category}
                        key={category}
                        onSelect={() => {
                          form.setValue("category", category);
                          setOpen(false);
                        }}
                      >
                        {category}
                        <Check
                          className={cn(
                            "ml-auto",
                            category === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
