interface Props {
  step: string;
  icon: string;
  title: string;
  desc: string;
}

const StepCard = ({ step, icon, title, desc }: Props) => {
  return (
    <div className="group relative rounded-2xl border bg-slate-50 p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Step Number Overlay */}
      <div className="absolute right-5 top-5 text-5xl font-extrabold text-slate-400 opacity-20">
        {step}
      </div>

      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-3xl">
        {icon}
      </div>

      {/* Card Header & Body */}
      <h3 className="mt-6 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {desc}
      </p>

      {/* Hover Bottom Border Accent */}
      <div className="mt-5 h-1 w-0 rounded-full bg-orange-500 transition-all duration-300 group-hover:w-full" />
    </div>
  );
};

export default StepCard;