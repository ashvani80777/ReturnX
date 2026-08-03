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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    await deleteItem(id);
    loadItems();
  };

 const handleReturned = async (id: number) => {
  await markItemReturned(id);
  loadItems();
};

  if (loading)
    return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">My Items</h1>

      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(item => (
            <div key={item.id} className="space-y-3">
              <ItemCard item={item} />

              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <Link to={`/items/edit/${item.id}`}>Edit</Link>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleReturned(item.id)}
                >
                  Returned
                </Button>

                <Button
                  variant="destructive"
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