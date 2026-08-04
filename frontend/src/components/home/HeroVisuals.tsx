import { Package } from "lucide-react";

const HeroVisual = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex h-[360px] w-[360px] items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-2xl sm:h-[420px] sm:w-[420px]">
        <div className="flex h-56 w-56 items-center justify-center rounded-3xl bg-white text-center shadow-xl sm:h-64 sm:w-64">
          <div>
            <Package size={70} className="mx-auto text-orange-500" />

            <p className="mt-4 text-xl font-bold text-slate-800">
              ReturnX
            </p>

            <p className="text-sm text-slate-500">
              Find lost items faster
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;