export type ItemCategory =
  | "ELECTRONICS"
  | "MOBILE"
  | "LAPTOP"
  | "WALLET"
  | "BAG"
  | "KEYS"
  | "ID_CARD"
  | "WATCH"
  | "JEWELLERY"
  | "CLOTHES"
  | "BOOKS"
  | "DOCUMENTS"
  | "BOTTLE"
  | "CHARGER"
  | "HEADPHONES"
  | "OTHER";

export type ItemType = "LOST" | "FOUND";

export type ItemStatus =
  | "LOST"
  | "FOUND"
  | "CLAIM_PENDING"
  | "RETURNED";

export interface Item {
  id: number;
  title: string;
  description: string;
  category: ItemCategory;
  type: ItemType;
  status: ItemStatus;
  location: string;
  imageUrl: string;
  ownerEmail: string;
  createdAt: string;
}

export interface CreateItemRequest {
  title: string;
  description: string;
  category: ItemCategory;
  location: string;
}

export interface UpdateItemRequest {
  title: string;
  description: string;
  category: ItemCategory;
  location: string;
}

export const ITEM_CATEGORIES: ItemCategory[] = [
  "ELECTRONICS",
  "MOBILE",
  "LAPTOP",
  "WALLET",
  "BAG",
  "KEYS",
  "ID_CARD",
  "WATCH",
  "JEWELLERY",
  "CLOTHES",
  "BOOKS",
  "DOCUMENTS",
  "BOTTLE",
  "CHARGER",
  "HEADPHONES",
  "OTHER",
];