import { Link } from "react-router-dom";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";

import SectionTitle from "@/components/home/SectionTitle";
import FeatureCard from "@/components/home/FeatureCard";
import StatCard from "@/components/home/StatCard";
import RewardCard from "@/components/home/RewardCard";
import StepCard from "@/components/home/StepCard";
import HeroVisual from "@/components/home/HeroVisuals";
import TrustSection from "@/components/home/TrustSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";

import {
  steps,
  features,
  rewards,
  stats,
  helpers,
} from "@/data/homeData";


const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">


      {/* HERO */}

      <section
        className="
        mx-auto
        flex
        min-h-[calc(100vh-64px)]
        max-w-7xl
        items-center
        gap-10
        px-6
        py-16
        lg:flex-row
        flex-col
      "
      >

        <div className="flex-1">

          <div
            className="
            mb-5
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-orange-100
            px-4
            py-2
            text-sm
            font-medium
            text-orange-600
          "
          >
            <ShieldCheck size={18}/>
            Smart Enterprise Lost & Found Platform
          </div>


          <h1
            className="
            text-5xl
            font-extrabold
            leading-tight
            text-slate-900
            lg:text-6xl
          "
          >
            Lost Something?
            <br/>

            <span className="text-orange-500">
              Find It.
            </span>

            <br/>

            Return It.
          </h1>


          <p
            className="
            mt-6
            max-w-xl
            text-lg
            text-slate-600
          "
          >
            ReturnX helps employees report lost items,
            discover found belongings and safely reconnect
            items with their rightful owners.
          </p>


          <div className="mt-8 flex gap-4">


            <Link
              to="/items/create-lost"
              className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-orange-500
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-orange-600
            "
            >
              Report Lost
              <ArrowRight size={18}/>
            </Link>



            <Link
              to="/found-items"
              className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-orange-500
              px-6
              py-3
              font-semibold
              text-orange-600
              transition
              hover:bg-orange-50
            "
            >
              Find Item
              <Search size={18}/>
            </Link>


          </div>


        </div>


        <HeroVisual/>


      </section>




      {/* HOW IT WORKS */}

      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-7xl">


          <SectionTitle
            title="How ReturnX Works"
            description="Recover your belongings through a simple and secure process."
          />


          <div className="grid gap-8 md:grid-cols-4">

            {steps.map(item=>(
              <StepCard
                key={item.step}
                {...item}
              />
            ))}

          </div>


        </div>

      </section>




      {/* FEATURES */}

      <section className="px-6 py-20">

        <div className="mx-auto max-w-7xl">


          <SectionTitle
            title="Powerful Features"
            description="Everything required for smart lost and found management."
          />


          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {features.map(item=>(
              <FeatureCard
                key={item.title}
                {...item}
              />
            ))}

          </div>


        </div>

      </section>





      {/* REWARDS */}


      <section className="bg-white px-6 py-20">


        <div
          className="
          mx-auto
          grid
          max-w-7xl
          gap-12
          lg:grid-cols-2
        "
        >


          <div>


            <SectionTitle
              title="Help Others. Earn Karma."
              description="Reward system that encourages employees to help each other."
            />


            <div className="space-y-4">

              {rewards.map(item=>(
                <RewardCard
                  key={item.title}
                  {...item}
                />
              ))}

            </div>


          </div>





          {/* LEADERBOARD */}


          <div
            className="
            rounded-3xl
            bg-gradient-to-br
            from-orange-500
            to-orange-600
            p-8
          "
          >

            <h3 className="text-2xl font-bold text-white">
              Top Helpers
            </h3>


            <p className="mt-2 text-orange-100">
              Employees making a difference
            </p>



            <div className="mt-8 space-y-4">

              {helpers.map(user=>(

                <div
                  key={user.name}
                  className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  bg-white/20
                  p-4
                  text-white
                  backdrop-blur
                "
                >

                  <span className="font-semibold">
                    {user.rank} {user.name}
                  </span>


                  <span className="font-bold">
                    {user.points}
                  </span>


                </div>

              ))}

            </div>


          </div>


        </div>


      </section>




      {/* TRUST */}

      <TrustSection />




      {/* STATS */}

      <section className="px-6 py-20">

        <div
          className="
          mx-auto
          grid
          max-w-7xl
          gap-6
          md:grid-cols-4
        "
        >

          {stats.map(item=>(
            <StatCard
              key={item.title}
              {...item}
            />
          ))}


        </div>

      </section>




      {/* CTA */}

      <CTASection />




      {/* FOOTER */}

      <Footer />


    </div>
  );
};


export default Home;