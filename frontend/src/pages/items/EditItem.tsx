import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "./ItemForm";
import { getItemById, updateItem } from "@/services/itemService";
import type {
  Item,
  CreateItemRequest,
  UpdateItemRequest,
} from "@/types/item";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    getItemById(Number(id))
      .then(setItem)
      .catch(() => navigate("/my-items"));
  }, [id, navigate]);

  const handleSubmit = async (data: CreateItemRequest) => {
    if (!id) return;

    setLoading(true);

    try {
      await updateItem(Number(id), data as UpdateItemRequest);
      navigate("/my-items");
    } finally {
      setLoading(false);
    }
  };

  if (!item) {
    return (
      <div className="p-6 text-center text-slate-500">
        Loading item details...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">
        Edit Item
      </h1>

      <ItemForm
        initialValues={item}
        submitText="Update Item"
        loading={loading}
        requireImage={false}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditItem;