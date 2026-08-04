import ItemCard from "@/components/home/HomeItemCard";
import type { Item } from "@/types/item";

interface Props {
  title?: string;
  items: Item[];
}

const CategorySection = ({ title, items }: Props) => {
  if (!items.length) return null;

  return (
    <section>
      {title && (
        <h2 className="mb-6 text-3xl font-bold text-slate-800">
          {title}
        </h2>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;