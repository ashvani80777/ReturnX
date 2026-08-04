interface Props {
  title: string;
  description?: string;
}

const SectionTitle = ({ title, description }: Props) => {
  return (
    <div className="mb-14 text-center">
      <h2 className="text-4xl font-extrabold text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;