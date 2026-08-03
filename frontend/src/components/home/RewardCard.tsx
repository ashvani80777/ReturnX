interface Props {
  points: string;
  title: string;
  desc: string;
}

const RewardCard = ({
  points,
  title,
  desc,
}: Props) => {
  return (
    <div
      className="
      flex
      items-center
      gap-5
      rounded-xl
      border
      bg-slate-50
      p-4
    "
    >

      <div
        className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-orange-500
        text-lg
        font-bold
        text-white
      "
      >
        {points}
      </div>


      <div>

        <h3
          className="
          font-bold
          text-slate-900
        "
        >
          {title}
        </h3>


        <p
          className="
          text-sm
          text-slate-600
        "
        >
          {desc}
        </p>

      </div>

    </div>
  );
};

export default RewardCard;