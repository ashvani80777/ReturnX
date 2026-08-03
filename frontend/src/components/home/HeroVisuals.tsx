import { Package } from "lucide-react";

const HeroVisual = () => {
  return (
    <div
      className="
      flex
      flex-1
      items-center
      justify-center
    "
    >

      <div
        className="
        flex
        h-[420px]
        w-[420px]
        items-center
        justify-center
        rounded-full
        bg-gradient-to-br
        from-orange-400
        to-orange-600
        shadow-2xl
      "
      >

        <div
          className="
          flex
          h-64
          w-64
          items-center
          justify-center
          rounded-3xl
          bg-white
          text-center
          shadow-xl
        "
        >

          <div>

            <Package
              size={70}
              className="
              mx-auto
              text-orange-500
            "
            />


            <p
              className="
              mt-4
              text-xl
              font-bold
              text-slate-800
            "
            >
              ReturnX
            </p>


            <p
              className="
              text-sm
              text-slate-500
            "
            >
              Find lost items faster
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default HeroVisual;