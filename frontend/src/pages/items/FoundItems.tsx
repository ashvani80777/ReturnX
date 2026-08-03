import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Search } from "lucide-react";

import ItemCard from "@/pages/items/ItemCard";
import ItemSearch from "@/pages/items/ItemSearch";
import CategoryFilter from "@/pages/items/CategoryFilter";
import { Button } from "@/components/ui/button";

import type { Item } from "@/types/item";
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

      let data: Item[];


      if (search.trim()) {
        data = await searchItems(search);
      }
      else if (category !== "ALL") {
        data = await getItemsByCategory(category as any);
      }
      else {
        data = await getFoundItems();
      }


      setItems(
        data.filter(item => item.type === "FOUND")
      );


    } catch(error) {

      console.error(error);

    }
    finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    loadItems();
  }, [search, category]);



  return (

    <div className="container mx-auto space-y-8 py-10">


      {/* Header */}

      <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white shadow-lg">


        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">


          <div>

            <h1 className="text-5xl font-extrabold tracking-tight">
              Found Items
            </h1>


            <p className="mt-3 max-w-lg text-lg text-orange-100">
              Browse found items reported by users and help return them to their rightful owners.
            </p>


          </div>



          <Button
            asChild
            className="bg-white px-6 py-3 text-orange-600 hover:bg-orange-50"
          >

            <Link to="/items/create-found">
              + Report Found Item
            </Link>

          </Button>


        </div>


      </div>





      {/* Search & Filter */}

      <div className="rounded-xl border bg-white p-5 shadow-sm">


        <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">

          <Search className="h-5 w-5 text-orange-500"/>

          Search Found Items

        </div>



        <div className="flex flex-col gap-4 md:flex-row">


          <ItemSearch
            value={search}
            onChange={setSearch}
          />


          <CategoryFilter
            value={category}
            onChange={setCategory}
          />


        </div>


      </div>





      {/* Items */}

      {
        loading ?


        <div className="flex h-60 items-center justify-center">

          <Loader2 className="h-10 w-10 animate-spin text-orange-500"/>

        </div>



        :


        !items.length ?


        <div className="rounded-xl border bg-white py-20 text-center shadow-sm">


          <h3 className="text-xl font-semibold text-slate-700">
            No Found Items Available
          </h3>


          <p className="mt-2 text-muted-foreground">
            Try changing your search or category filter.
          </p>


        </div>



        :



        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">


          {
            items.map(item => (

              <ItemCard
                key={item.id}
                item={item}
                actionLabel="This Is Mine"
                actionPath={`/claims/create/${item.id}`}
              />

            ))
          }


        </div>

      }



    </div>

  );
}