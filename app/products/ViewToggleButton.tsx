"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductStore } from "@/providers/ProductProvider";
import { LayoutGrid, List } from "lucide-react";

export default function ViewToggleButton() {
  const { view, setView } = useProductStore((state) => state);
  const handleViewChange = (value: "grid" | "list") => {
    setView(value);
  };

  return (
    <Select value={view} onValueChange={handleViewChange}>
      <SelectTrigger className="bg-background w-[100px] justify-self-end m-1">
        <SelectValue placeholder="View" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="grid">
          <div className="flex items-center gap-1">
            <LayoutGrid size={16} />
            Grid
          </div>
        </SelectItem>
        <SelectItem value="list">
          <div className="flex items-center gap-1">
            <List size={16} />
            List
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
