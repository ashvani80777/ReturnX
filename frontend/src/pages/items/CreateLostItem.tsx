import { useNavigate } from "react-router-dom";

import ItemForm from "./ItemForm";

import { createLostItem } from "@/services/itemService";

import type { CreateItemRequest } from "@/types/item";


const CreateLostItem = () => {

  const navigate = useNavigate();


  const handleSubmit = async (
    data: CreateItemRequest,
    image?: File
  ) => {

    try {

      await createLostItem(data, image);

      alert("Lost item reported successfully.");

      navigate("/my-items");

    } catch(error) {

      console.error(error);

      alert("Failed to report lost item.");

    }

  };


  return (

    <div className="
    mx-auto
    max-w-3xl
    px-6
    py-6
    ">


      <h1 className="
      mb-6
      text-3xl
      font-bold
      text-slate-800
      ">

        Report Lost Item

      </h1>



      <ItemForm

        submitText="Report Lost Item"

        onSubmit={handleSubmit}

      />


    </div>

  );

};


export default CreateLostItem;