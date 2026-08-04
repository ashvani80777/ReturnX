import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getMyItems } from "@/services/itemService";
import type { Item } from "@/types/item";

const MyItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getMyItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to load my items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500">
        Loading your items...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">My Items</h1>

      {items.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center text-slate-500">
          No items reported by you yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyItems;