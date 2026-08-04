import {
  PackageCheck,
  Zap,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  MapPin,
} from "lucide-react";

const HeroVisual = () => {
  return (
    <div className="relative flex w-full flex-1 items-center justify-center py-6 lg:py-0">
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-orange-500/25 via-amber-400/15 to-transparent blur-3xl sm:h-[500px] sm:w-[500px]" />

      {/* ⭕ MAIN OUTER GLASS CIRCLE */}
      <div className="relative flex h-[360px] w-[360px] items-center justify-center rounded-full border border-orange-400/30 bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-orange-400/5 p-6 shadow-2xl shadow-orange-500/10 backdrop-blur-xl sm:h-[460px] sm:w-[460px] sm:p-8">
        
        {/* Inner Decorative Glass Ring */}
        <div className="absolute inset-3 rounded-full border border-white/40 bg-white/5 backdrop-blur-sm" />

        {/* ⚡ FLOATING BADGE 1: REAL-TIME ALERTS (Replaced Smart AI Match) */}
        <div className="absolute -left-2 top-4 z-20 flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/90 p-2.5 shadow-lg shadow-orange-500/10 backdrop-blur-md transition-all duration-300 hover:scale-105 sm:-left-6 sm:top-8 sm:p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/15 text-orange-600 sm:h-9 sm:w-9">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 fill-orange-500" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-800 sm:text-xs">Real-Time Alerts</p>
            <p className="hidden text-[10px] font-medium text-slate-500 sm:block">Instant Live Notifications</p>
          </div>
        </div>

        {/* Floating Badge 2: Top Right */}
        <div className="absolute -right-2 top-6 z-20 flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50/90 px-3 py-1 shadow-md backdrop-blur-md sm:-right-4 sm:top-10 sm:px-3.5 sm:py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-600 sm:h-4 sm:w-4" />
          <span className="text-[11px] font-bold text-amber-900 sm:text-xs">+50 Karma Awarded</span>
        </div>

        {/* Floating Badge 3: Bottom Left */}
        <div className="absolute -left-2 bottom-6 z-20 flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/90 p-2.5 shadow-lg shadow-orange-500/10 backdrop-blur-md transition-all duration-300 hover:scale-105 sm:-left-6 sm:bottom-10 sm:p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 sm:h-9 sm:w-9">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-800 sm:text-xs">100% Verified</p>
            <p className="hidden text-[10px] font-medium text-slate-500 sm:block">Safe Recovery Hub</p>
          </div>
        </div>

        {/* Floating Badge 4: Bottom Right */}
        <div className="absolute -right-2 bottom-4 z-20 flex items-center gap-2.5 rounded-2xl border border-slate-800/80 bg-slate-900/90 p-2.5 text-white shadow-xl backdrop-blur-md sm:-right-6 sm:bottom-8 sm:p-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white sm:h-8 sm:w-8">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="pr-1">
            <p className="text-[9px] font-medium text-emerald-400 sm:text-[10px]">Recently Returned</p>
            <p className="text-[11px] font-bold text-white sm:text-xs">MacBook Pro M2</p>
          </div>
        </div>

        {/* ⭕ CENTER CIRCULAR CARD */}
        <div className="relative z-10 flex h-56 w-56 flex-col items-center justify-center rounded-full border border-white/80 bg-white/85 p-6 text-center shadow-2xl shadow-orange-500/15 backdrop-blur-2xl transition-all duration-300 hover:scale-105 sm:h-64 sm:w-64">
          
          {/* Main Brand Icon Container */}
          <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 shadow-xl shadow-orange-500/30 sm:h-20 sm:w-20">
            <PackageCheck className="h-8 w-8 text-white sm:h-10 sm:w-10" />
            <div className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white shadow-sm">
              <TrendingUp size={12} />
            </div>
          </div>

          <h3 className="text-xl font-black tracking-tight text-slate-800 sm:text-2xl">
            Return<span className="text-orange-500">X</span>
          </h3>

          <p className="mt-0.5 text-[11px] font-semibold text-slate-500 sm:text-xs">
            Enterprise Lost & Found Hub
          </p>

          <div className="mt-3 flex items-center gap-1.5 rounded-full border border-orange-200/60 bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold text-orange-600 sm:mt-4 sm:px-3 sm:py-1 sm:text-[11px]">
            <MapPin size={11} className="text-orange-500" />
            <span>Campus & Office Wide</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroVisual;