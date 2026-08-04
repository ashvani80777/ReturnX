import { useNavigate } from "react-router-dom";
import { CalendarDays, MapPin, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import type { Item } from "@/types/item";

interface Props {
  item: Item;
}

const formatDate = (date?: string) => {
  if (!date) return "N/A";
  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "N/A";
  }
};

const HomeItemCard = ({ item }: Props) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate(`/items/${item.id}`);
    } else {
      navigate("/login");
    }
  };

  const fallbackImage =
    "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=400&q=80";

  return (
    <Card className="group flex h-full flex-col overflow-hidden bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Item Image & Type Badge */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-50">
        <img
          src={item.imageUrl || fallbackImage}
          alt={item.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImage;
          }}
          className="h-full w-full object-cover p-2 transition duration-500 group-hover:scale-105"
        />

        <Badge
          className={`absolute right-3 top-3 font-semibold text-white ${
            item.type === "LOST"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {item.type}
        </Badge>
      </div>

      {/* Card Body */}
      <CardContent className="flex flex-1 flex-col justify-between space-y-3 p-4">
        <div>
          <h3
            className="line-clamp-1 text-lg font-bold text-slate-800"
            title={item.title}
          >
            {item.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
            {item.description || "No description available."}
          </p>
        </div>

        <div className="space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 shrink-0 text-orange-500" />
            <span className="truncate capitalize">
              {item.category ? item.category.replaceAll("_", " ") : "General"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-orange-500" />
            <span className="truncate">
              {item.location || "Location not specified"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-orange-500" />
            <span>{formatDate(item.createdAt)}</span>
          </div>
        </div>
      </CardContent>

      {/* Card Action */}
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleViewDetails}
          className="w-full bg-orange-500 text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-md"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HomeItemCard;