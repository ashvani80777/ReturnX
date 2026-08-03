import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ItemCard from "@/pages/items/ItemCard";
import ItemSearch from "@/pages/items/ItemSearch";
import CategoryFilter from "@/pages/items/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Item } from "@/types/item";
import {
  getItemsByCategory,
  getLostItems,
  searchItems,
} from "@/services/itemService";
import { createClaim } from "@/services/claimService";

export default function LostItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const navigate = useNavigate();

  const loadItems = async () => {
    try {
      setLoading(true);

      let data: Item[];

      if (search.trim()) data = await searchItems(search);
      else if (category !== "ALL") data = await getItemsByCategory(category as any);
      else data = await getLostItems();

      setItems(data.filter(item => item.type === "LOST"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [search, category]);

  const handleClaim = async (itemId: number) => {
    try {
      const res = await createClaim(itemId);
      navigate(`/chat/${res.chatRoomId}`);
    } catch {
      alert("Unable to claim item.");
    }
  };

  const content = useMemo(() => {
    if (loading)
      return (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );

    if (!items.length)
      return (
        <div className="rounded-lg border py-16 text-center text-muted-foreground">
          No lost items found.
        </div>
      );

    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            actionLabel="Claim This Item"
            onAction={() => handleClaim(item.id)}
          />
        ))}
      </div>
    );
  }, [items, loading]);

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lost Items</h1>
          <p className="text-muted-foreground">
            Browse reported lost items.
          </p>
        </div>

        <Button asChild>
          <Link to="/items/create-lost">Report Lost Item</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <ItemSearch value={search} onChange={setSearch} />
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      {content}
    </div>
  );
}