const TrustSection = () => {
  const items = [
    "Verified Employees",
    "JWT Secure Access",
    "Private Chat",
    "Protected Data",
  ];

  return (
    <section className="bg-slate-50 px-6 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-3xl bg-white p-10 shadow-sm lg:grid-cols-2">
        {/* Left Text & Features */}
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900">
            Built For Secure
            <br />
            Enterprise Recovery
          </h2>

          <p className="mt-5 text-slate-600">
            ReturnX provides a trusted environment where employees can safely
            report, verify and recover belongings with complete privacy.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-orange-50 p-4 font-medium text-slate-700"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual Graphic */}
        <div className="flex justify-center">
          <div className="flex h-72 w-72 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-8xl shadow-xl">
            🔐
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;