import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Item } from "@/types/item";


interface ItemCardProps {
  item: Item;
  actionLabel?: string;
  actionPath?: string;
  onAction?: () => void;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function ItemCard({
  item,
  actionLabel,
  actionPath,
  onAction,
}: ItemCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="h-52 w-full object-cover"
      />

      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-semibold">{item.title}</h3>

          <Badge
            variant={item.type === "LOST" ? "destructive" : "secondary"}
          >
            {item.type}
          </Badge>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {item.description}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span>{item.category.replaceAll("_", " ")}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{item.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>{formatDate(item.createdAt)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1">
          <Link to={`/items/${item.id}`}>View Details</Link>
        </Button>

        {actionLabel &&
          (actionPath ? (
            <Button asChild variant="outline" className="flex-1">
              <Link to={actionPath}>{actionLabel}</Link>
            </Button>
          ) : (
            <Button
              variant="outline"
              className="flex-1"
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          ))}
      </CardFooter>
    </Card>
  );
}