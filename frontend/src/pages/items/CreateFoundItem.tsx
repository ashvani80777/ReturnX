import { useNavigate } from "react-router-dom";
import ItemForm from "./ItemForm";
import { createFoundItem } from "@/services/itemService";
import type { CreateItemRequest } from "@/types/item";

const CreateFoundItem = () => {
  const navigate = useNavigate();

  const handleSubmit = async (
    data: CreateItemRequest,
    image?: File
  ) => {
    if (!image) return;

    await createFoundItem(data, image);
    navigate("/my-items");
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Report Found Item
      </h1>

      <ItemForm
        submitText="Report Found Item"
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateFoundItem;