import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ITEM_CATEGORIES } from "@/types/item";
import type { ItemCategory } from "@/types/item";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full md:w-64">
        <SelectValue placeholder="Filter by Category" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ALL">All Categories</SelectItem>

        {ITEM_CATEGORIES.map((category: ItemCategory) => (
          <SelectItem key={category} value={category}>
            {category.replaceAll("_", " ")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}