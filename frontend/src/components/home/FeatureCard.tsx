interface Props {
  icon: string;
  title: string;
  desc: string;
}

const FeatureCard = ({
  icon,
  title,
  desc,
}: Props) => {
  return (
    <div
      className="
      rounded-2xl
      bg-white
      p-7
      shadow-sm
      transition
      duration-300
      hover:-translate-y-2
      hover:shadow-xl
    "
    >

      <div
        className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-xl
        bg-orange-100
        text-3xl
      "
      >
        {icon}
      </div>


      <h3
        className="
        mt-6
        text-xl
        font-bold
        text-slate-900
      "
      >
        {title}
      </h3>


      <p
        className="
        mt-3
        text-sm
        leading-relaxed
        text-slate-600
      "
      >
        {desc}
      </p>

    </div>
  );
};

export default FeatureCard;