import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Search } from "lucide-react";

import ItemCard from "@/pages/items/ItemCard";
import ItemSearch from "@/pages/items/ItemSearch";
import CategoryFilter from "@/pages/items/CategoryFilter";
import { Button } from "@/components/ui/button";
import type { Item, ItemCategory } from "@/types/item";
import {
  getLostItems,
  getItemsByCategory,
  searchItems,
} from "@/services/itemService";

export default function LostItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = search.trim()
        ? await searchItems(search)
        : category !== "ALL"
        ? await getItemsByCategory(category as ItemCategory)
        : await getLostItems();

      setItems(data.filter((i) => i.type === "LOST"));
    } catch (e) {
      console.error("Failed to load lost items", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [search, category]);

  return (
    <div className="container mx-auto space-y-8 px-6 py-10">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white shadow-lg">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-5xl font-extrabold">Lost Items</h1>
            <p className="mt-3 text-lg text-orange-100">
              Find your missing belongings reported by employees.
            </p>
          </div>

          <Button asChild className="bg-white text-orange-600 hover:bg-orange-50">
            <Link to="/items/create-lost">+ Report Lost Item</Link>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Search className="text-orange-500" />
          Search Lost Items
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <ItemSearch value={search} onChange={setSearch} />
          <CategoryFilter value={category} onChange={setCategory} />
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="flex h-60 items-center justify-center">
          <Loader2 size={40} className="animate-spin text-orange-500" />
        </div>
      ) : !items.length ? (
        <div className="rounded-xl border bg-white py-20 text-center shadow-sm">
          <h3 className="text-xl font-semibold">No Lost Items Found</h3>
          <p className="mt-2 text-slate-500">
            Try changing your search or category.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} actionLabel="View Details" />
          ))}
        </div>
      )}
    </div>
  );
}