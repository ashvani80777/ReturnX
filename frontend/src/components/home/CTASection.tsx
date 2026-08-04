import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-14 text-center shadow-xl md:px-20">
        <h2 className="text-4xl font-extrabold text-white md:text-5xl">
          Lost Something?
          <br />
          Start Your Recovery Journey Today.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-orange-100">
          Report lost items, discover found belongings, and reconnect with your
          workplace community through ReturnX.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/items/create-lost"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            Report Lost Item
          </Link>

          <Link
            to="/found-items"
            className="rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-orange-600"
          >
            Browse Found Items
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;