import api from "./api";
import type {
  CreateItemRequest,
  UpdateItemRequest,
  Item,
  ItemCategory,
} from "@/types/item";

const createFormData = (
  data: CreateItemRequest,
  image: File
): FormData => {
  const formData = new FormData();

  formData.append("data", JSON.stringify(data));
  formData.append("image", image);

  return formData;
};

export const getLostItems = async (): Promise<Item[]> => {
  const { data } = await api.get("/items/lost");
  return data;
};

export const getFoundItems = async (): Promise<Item[]> => {
  const { data } = await api.get("/items/found");
  return data;
};

export const getMyItems = async (): Promise<Item[]> => {
  const { data } = await api.get("/items/my-items");
  return data;
};

export const getItemById = async (id: number): Promise<Item> => {
  const { data } = await api.get(`/items/${id}`);
  return data;
};

export const searchItems = async (
  keyword: string
): Promise<Item[]> => {
  const { data } = await api.get("/items/search", {
    params: { keyword },
  });
  return data;
};

export const getItemsByCategory = async (
  category: ItemCategory
): Promise<Item[]> => {
  const { data } = await api.get(`/items/category/${category}`);
  return data;
};

export const createLostItem = async (
  item: CreateItemRequest,
  image: File
): Promise<Item> => {
  const { data } = await api.post(
    "/items/lost",
    createFormData(item, image)
  );
  return data;
};

export const createFoundItem = async (
  item: CreateItemRequest,
  image: File
): Promise<Item> => {
  const { data } = await api.post(
    "/items/found",
    createFormData(item, image)
  );
  return data;
};

export const updateItem = async (
  id: number,
  item: UpdateItemRequest
): Promise<Item> => {
  const { data } = await api.put(`/items/${id}`, item);
  return data;
};

export const deleteItem = async (
  id: number
): Promise<string> => {
  const { data } = await api.delete(`/items/${id}`);
  return data;
};

export const markItemReturned = async (
  id: number
): Promise<string> => {
  const { data } = await api.put(`/items/${id}/returned`);
  return data;
};