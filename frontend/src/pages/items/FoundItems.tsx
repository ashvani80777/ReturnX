import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Loader2,
  Search,
  PackageCheck,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

import ItemCard from "@/pages/items/ItemCard";
import ItemSearch from "@/pages/items/ItemSearch";
import CategoryFilter from "@/pages/items/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Item, ItemCategory } from "@/types/item";
import {
  getFoundItems,
  getItemsByCategory,
  searchItems,
} from "@/services/itemService";

export default function FoundItems() {
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
        : await getFoundItems();

      setItems(data.filter((i) => i.type === "FOUND"));
    } catch (e) {
      console.error("Failed to load found items", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [search, category]);

  const features = [
    {
      icon: <PackageCheck className="text-orange-500" />,
      title: "Verified Reports",
      text: "Safe item recovery process",
    },
    {
      icon: <ShieldCheck className="text-orange-500" />,
      title: "Secure Claims",
      text: "Protected ownership verification",
    },
    {
      icon: <MessageCircle className="text-orange-500" />,
      title: "Private Chat",
      text: "Coordinate handover safely",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-10">
      {/* Header */}
      <section className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 p-10 text-white shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-5xl font-extrabold">Found Items</h1>
            <p className="mt-3 max-w-xl text-lg text-orange-100">
              Discover items reported by employees and help return them to
              their rightful owners.
            </p>
          </div>

          <Button asChild className="bg-white text-orange-600 hover:bg-orange-50">
            <Link to="/items/create-found">+ Report Found Item</Link>
          </Button>
        </div>
      </section>

      {/* Feature Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title}>
            <CardContent className="flex items-center gap-4 p-5">
              {f.icon}
              <div>
                <p className="font-semibold">{f.title}</p>
                <p className="text-sm text-slate-500">{f.text}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-5 flex items-center gap-2 text-xl font-semibold">
            <Search className="text-orange-500" />
            Search Found Items
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <ItemSearch value={search} onChange={setSearch} />
            <CategoryFilter value={category} onChange={setCategory} />
          </div>
        </CardContent>
      </Card>

      {/* Item Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        </div>
      ) : !items.length ? (
        <Card>
          <CardContent className="py-20 text-center">
            <h2 className="text-2xl font-bold text-slate-700">No Found Items</h2>
            <p className="mt-2 text-slate-500">
              No matching found items available currently. Try another search.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              actionLabel="View & Claim"
              actionPath={`/items/${item.id}`} // Fixed Route
            />
          ))}
        </div>
      )}
    </div>
  );
}