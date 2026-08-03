import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ITEM_CATEGORIES } from "@/types/item";

import type {
  CreateItemRequest,
  Item,
  ItemCategory,
} from "@/types/item";

interface ItemFormProps {
  initialValues?: Partial<Item>;
  submitText: string;
  loading?: boolean;
  requireImage?: boolean;
  onSubmit: (data: CreateItemRequest, image?: File) => Promise<void>;
}

export default function ItemForm({
  initialValues,
  submitText,
  loading = false,
  requireImage = true,
  onSubmit,
}: ItemFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );
  const [category, setCategory] = useState<ItemCategory>(
    (initialValues?.category as ItemCategory) ?? "OTHER"
  );
  const [location, setLocation] = useState(initialValues?.location ?? "");
  const [image, setImage] = useState<File>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (requireImage && !image) {
      alert("Please select an image.");
      return;
    }

    await onSubmit(
      {
        title,
        description,
        category,
        location,
      },
      image
    );
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              required
              value={title}
              maxLength={120}
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              required
              rows={5}
              value={description}
              placeholder="Describe the item"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>

            <Select
              value={category}
              onValueChange={(value) =>
                setCategory(value as ItemCategory)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {ITEM_CATEGORIES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item.replaceAll("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              required
              value={location}
              placeholder="Lost/Found location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Image</Label>

            <Input
              type="file"
              accept="image/*"
              required={requireImage}
              onChange={(e) =>
                setImage(e.target.files?.[0])
              }
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {submitText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}