import {Card,CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {MapPin,CalendarDays} from "lucide-react";
import {Link} from "react-router-dom";

const ItemCard=({item}:any)=>
<Card className="overflow-hidden shadow-sm transition hover:shadow-lg">

 <div className="h-48 bg-slate-100">
  {item.imageUrl?
   <img src={item.imageUrl} className="h-full w-full object-cover"/>:
   <div className="flex h-full items-center justify-center text-slate-400">
    No Image
   </div>
  }
 </div>

 <CardContent className="space-y-3 p-5">

  <div className="flex justify-between">
   <h2 className="text-lg font-bold text-slate-800">{item.title}</h2>
   <span className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-600">
    LOST
   </span>
  </div>

  <p className="line-clamp-2 text-slate-600">{item.description}</p>

  <div className="space-y-2 text-sm text-slate-500">
   <div className="flex items-center gap-2"><MapPin size={16}/>{item.location}</div>
   <div className="flex items-center gap-2"><CalendarDays size={16}/>{item.date}</div>
  </div>

  <Button asChild className="mt-3 w-full bg-orange-500 hover:bg-orange-600">
   <Link to={`/items/${item.id}`}>View Details</Link>
  </Button>

 </CardContent>
</Card>;

export default ItemCard;