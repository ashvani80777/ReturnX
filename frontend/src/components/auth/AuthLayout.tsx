import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface Props {
  children: ReactNode;
  formSide?: "left" | "right";
}

const AuthLayout = ({ children, formSide = "right" }: Props) => {
  const navigate = useNavigate();

  const infoSection = (
    <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-8 md:flex">
      {/* Background Decorative Glow Effect */}
      <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" />

      {/* Hero Visual Card Composition */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Outer Circular Backdrop */}
        <div className="relative flex h-72 w-72 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          {/* Floating Badge 1: Smart Search */}
          <div className="absolute -left-5 top-8 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-lg backdrop-blur-sm animate-bounce [animation-duration:3s]">
            <Search className="h-4 w-4 text-orange-500" />
            <span>Smart Search</span>
          </div>

          {/* Floating Badge 2: Verified */}
          <div className="absolute -right-5 bottom-10 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-lg backdrop-blur-sm animate-bounce [animation-duration:4s]">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>100% Verified</span>
          </div>

          {/* Floating Badge 3: Karma Points */}
          <div className="absolute -right-2 top-3 flex items-center gap-1.5 rounded-full bg-amber-300 px-3 py-1 text-[11px] font-bold text-slate-900 shadow-md">
            <Sparkles className="h-3.5 w-3.5 text-orange-700" />
            <span>Earn Karma</span>
          </div>

          {/* Central White Hero Badge */}
          <div className="flex h-48 w-48 flex-col items-center justify-center rounded-3xl bg-white p-4 text-center shadow-2xl transition-transform duration-300 hover:scale-105">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
              <PackageCheck className="h-10 w-10 text-orange-500" />
            </div>

            <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-800">
              Return<span className="text-orange-500">X</span>
            </h3>

            <p className="mt-0.5 text-xs font-medium text-slate-500">
              Enterprise Recovery
            </p>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="mt-8 text-center text-white">
          <h2 className="text-2xl font-extrabold tracking-wide">
            Lost it? ReturnX it!
          </h2>
          <p className="mt-2 max-w-xs text-xs leading-relaxed text-orange-100">
            Connect securely, verify items with ease, and return belongings to
            their rightful owners.
          </p>
        </div>
      </div>
    </div>
  );

  const formSection = (
    <div className="flex w-full items-center justify-center bg-white p-4 md:w-1/2 md:p-6">
      {children}
    </div>
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-100 p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute right-5 top-5 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-500 text-white shadow-md transition hover:bg-orange-600"
        title="Back to Home"
      >
        <ArrowLeft size={18} />
      </button>

      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {formSide === "left" ? (
          <>
            {formSection}
            {infoSection}
          </>
        ) : (
          <>
            {infoSection}
            {formSection}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;