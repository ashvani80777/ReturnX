import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarDays, ImageOff } from "lucide-react";
import { Link } from "react-router-dom";

const ItemCard = ({ item }: any) => {
  const isLost = item?.type === "LOST";
  const displayDate = item?.date || (item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A");

  return (
    <Card className="group overflow-hidden border border-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Image Container - object-contain prevents cropping */}
      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden bg-slate-100 p-3">
        {item?.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-slate-400">
            <ImageOff size={32} />
            <span className="text-xs font-medium">No Image Available</span>
          </div>
        )}
      </div>

      <CardContent className="space-y-3 p-5">
        {/* Title & Dynamic Type Badge */}
        <div className="flex items-center justify-between gap-2">
          <h2 className="truncate text-lg font-bold text-slate-800" title={item?.title}>
            {item?.title}
          </h2>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              isLost
                ? "bg-orange-100 text-orange-600"
                : "bg-emerald-100 text-emerald-600"
            }`}
          >
            {item?.type || "LOST"}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-slate-600">
          {item?.description || "No description provided."}
        </p>

        {/* Location & Date */}
        <div className="space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="shrink-0 text-orange-500" />
            <span className="truncate">{item?.location || "Location not specified"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={15} className="shrink-0 text-orange-500" />
            <span>{displayDate}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button asChild className="mt-3 w-full bg-orange-500 font-semibold hover:bg-orange-600">
          <Link to={`/items/${item?.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItemCard;