import { useNavigate } from "react-router-dom";
import { CalendarDays, MapPin, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import type { Item } from "@/types/item";


interface Props {
  item: Item;
}


const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });



const HomeItemCard = ({ item }: Props) => {

  const navigate = useNavigate();


  const handleViewDetails = () => {

    const token = localStorage.getItem("token");

    if(token){
      navigate(`/items/${item.id}`);
    }else{
      navigate("/login");
    }

  };


  return (
    <Card className="group flex h-[420px] w-full flex-col overflow-hidden bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">


      <div className="relative h-52 overflow-hidden bg-slate-50">

        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
        />


        <Badge
          className={
            item.type === "LOST"
              ? "absolute right-3 top-3 bg-red-500 text-white"
              : "absolute right-3 top-3 bg-green-500 text-white"
          }
        >
          {item.type}
        </Badge>

      </div>



      <CardContent className="space-y-3 p-4">


        <h3 className="truncate text-lg font-bold text-slate-800">
          {item.title}
        </h3>


        <p className="line-clamp-2 text-sm text-slate-500">
          {item.description}
        </p>



        <div className="space-y-2 text-sm text-slate-600">


          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-orange-500" />

            <span className="truncate">
              {item.category.replaceAll("_", " ")}
            </span>
          </div>



          <div className="flex items-center gap-2">

            <MapPin className="h-4 w-4 text-orange-500" />

            <span className="truncate">
              {item.location}
            </span>

          </div>



          <div className="flex items-center gap-2">

            <CalendarDays className="h-4 w-4 text-orange-500" />

            {formatDate(item.createdAt)}

          </div>


        </div>


      </CardContent>



      <CardFooter className="mt-auto p-4 pt-0">

<Button
  onClick={handleViewDetails}
  className="
    w-full
    cursor-pointer
    bg-orange-500
    text-white
    transition-all
    duration-300
    hover:bg-orange-600
    hover:shadow-lg
    hover:-translate-y-0.5
    active:scale-95
  "
>
  View Details
</Button>

      </CardFooter>


    </Card>
  );
};


export default HomeItemCard;