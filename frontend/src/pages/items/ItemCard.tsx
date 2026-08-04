import { Link } from "react-router-dom";
import { MapPin, CalendarDays } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Item } from "@/types/item";

interface ItemCardProps {
  item: Item;
  actionLabel?: string;
  actionPath?: string;
}

const ItemCard = ({
  item,
  actionLabel = "View Details",
  actionPath,
}: ItemCardProps) => {
  const destination = actionPath || `/items/${item.id}`;

  return (
    <Card className="overflow-hidden shadow-sm transition hover:shadow-lg">
      <div className="h-48 bg-slate-100">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            No Image
          </div>
        )}
      </div>

      <CardContent className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h2 className="line-clamp-1 text-lg font-bold text-slate-800">
            {item.title}
          </h2>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              item.type === "LOST"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {item.type}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-slate-600">
          {item.description}
        </p>

        <div className="space-y-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            {item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "N/A"}
          </div>
        </div>

        <Button asChild className="mt-3 w-full bg-orange-500 hover:bg-orange-600">
          <Link to={destination}>{actionLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItemCard;