import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  getItemById,
  deleteItem,
 markItemReturned,
} from "@/services/itemService";

import { createClaim } from "@/services/claimService";
import type { Item } from "@/types/item";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [claimLoading, setClaimLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    getItemById(Number(id))
      .then(setItem)
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!item) return;

    if (!confirm("Delete this item?")) return;

    await deleteItem(item.id);
    navigate("/my-items");
  };

  const handleReturned = async () => {
    if (!item) return;

    await markItemReturned(item.id);
    navigate("/my-items");
  };

  const handleClaim = async () => {
    if (!item) return;

    try {
      setClaimLoading(true);

      const claim = await createClaim(item.id);

      navigate(`/chat/${claim.chatRoomId}`);
    } catch (err: any) {
      if (err?.response?.data?.chatRoomId) {
        navigate(`/chat/${err.response.data.chatRoomId}`);
        return;
      }

      alert(err?.response?.data?.message || "Unable to create claim.");
    } finally {
      setClaimLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-center">Loading...</div>
      </>
    );
  }

  if (!item) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-center">Item not found.</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-5xl p-6">
        <Card>
          <CardContent className="grid gap-8 p-8 md:grid-cols-2">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-96 w-full rounded-xl object-cover"
            />

            <div className="space-y-5">
              <div>
                <h2 className="text-3xl font-bold">{item.title}</h2>

                <div className="mt-3 flex gap-2">
                  <Badge>{item.type}</Badge>
                  <Badge>{item.status}</Badge>
                  <Badge>{item.category}</Badge>
                </div>
              </div>

              <p className="text-slate-600">{item.description}</p>

              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="h-4 w-4" />
                {item.location}
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <CalendarDays className="h-4 w-4" />
                {new Date(item.createdAt).toLocaleString()}
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <Button
                  onClick={handleClaim}
                  disabled={claimLoading}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {claimLoading
                    ? "Creating..."
                    : item.type === "LOST"
                    ? "Claim This Item"
                    : "This Is Mine"}
                </Button>

                <Button variant="outline" onClick={() => navigate(-1)}>
                  Back
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => navigate(`/items/${item.id}/edit`)}
                >
                  Edit
                </Button>

                <Button onClick={handleReturned}>
                  Mark Returned
                </Button>

                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ItemDetails;