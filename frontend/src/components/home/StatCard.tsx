interface Props {
  icon: string;
  number: string;
  title: string;
}

const StatCard = ({
  icon,
  number,
  title,
}: Props) => {
  return (
    <div
      className="
      rounded-2xl
      bg-white
      p-6
      text-center
      shadow-sm
      transition
      duration-300
      hover:-translate-y-2
      hover:shadow-lg
    "
    >

      <div className="text-4xl">
        {icon}
      </div>


      <h3
        className="
        mt-4
        text-3xl
        font-extrabold
        text-orange-500
      "
      >
        {number}
      </h3>


      <p
        className="
        mt-2
        font-medium
        text-slate-600
      "
      >
        {title}
      </p>

    </div>
  );
};

export default StatCard;