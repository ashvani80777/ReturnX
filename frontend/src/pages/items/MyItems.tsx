import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import { Button } from "@/components/ui/button";

import {
  getMyItems,
  deleteItem,
  markItemReturned,
} from "@/services/itemService";

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

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    try {
      await deleteItem(id);
      loadItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleReturned = async (id: number) => {
    try {
      await markItemReturned(id);
      loadItems();
    } catch (error) {
      console.error("Failed to mark item as returned:", error);
    }
  };

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
            <div key={item.id} className="space-y-3">
              <ItemCard item={item} />

              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link to={`/items/edit/${item.id}`}>Edit</Link>
                </Button>

                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleReturned(item.id)}
                  disabled={item.status === "RETURNED"}
                >
                  {item.status === "RETURNED" ? "Returned" : "Mark Returned"}
                </Button>

                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyItems;