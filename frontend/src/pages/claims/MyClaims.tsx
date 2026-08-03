import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  MessageCircle,
  Package,
  User,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  getMyClaims,
  type ClaimResponse,
} from "@/services/claimService";


const MyClaims = () => {

  const [claims, setClaims] = useState<ClaimResponse[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadClaims();
  }, []);


  const loadClaims = async () => {

    try {

      const data = await getMyClaims();

      console.log("Claims Response:", data);

      setClaims(data);

    } catch (error) {

      console.error(error);

    }
    finally {

      setLoading(false);

    }

  };



  if (loading) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <div className="text-lg text-slate-500">
          Loading your claims...
        </div>

      </div>

    );

  }



  return (

    <div className="mx-auto max-w-7xl space-y-10 px-6 py-10">


      {/* TOP HEADER */}

      <section className="rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-10 text-white shadow-xl">


        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


          <div>

            <div className="mb-3 flex items-center gap-2 text-orange-100">

              <ShieldCheck size={20} />

              Secure Recovery Center

            </div>


            <h1 className="text-5xl font-extrabold tracking-tight">

              My Claims

            </h1>


            <p className="mt-3 max-w-xl text-lg text-orange-100">

              Manage your claimed items, verify ownership and
              complete the return process through secure communication.

            </p>


          </div>


          <div className="rounded-2xl bg-white/20 px-8 py-5 backdrop-blur">


            <p className="text-sm text-orange-100">
              Active Claims
            </p>


            <p className="text-4xl font-bold">
              {claims.length}
            </p>


          </div>


        </div>


      </section>




      {claims.length === 0 ?


        (

          <Card className="border-none shadow-lg">

            <CardContent className="flex flex-col items-center justify-center py-24">


              <div className="rounded-full bg-orange-100 p-5">

                <Package className="h-10 w-10 text-orange-500" />

              </div>


              <h2 className="mt-5 text-2xl font-bold text-slate-700">

                No Active Claims

              </h2>


              <p className="mt-2 text-slate-500">

                Claim a found item to start the recovery process.

              </p>


            </CardContent>

          </Card>


        )


        :


        (


          <div className="grid gap-8 lg:grid-cols-2">


            {
              claims.map((claim) => (


                <Card
                  key={claim.id}
                  className="group overflow-hidden border-none shadow-lg transition hover:shadow-2xl"
                >


                  {/* CARD TOP */}

                  <div className="flex items-center justify-between bg-slate-900 px-6 py-4 text-white">


                    <div className="flex items-center gap-3">


                      <div className="rounded-xl bg-orange-500 p-3">

                        <Package size={22} />

                      </div>


                      <div>

                        <p className="text-xs text-slate-300">
                          Claim Reference
                        </p>

                        <p className="font-bold">
                          #{claim.id}
                        </p>

                      </div>


                    </div>



                    <span className="rounded-full bg-yellow-400 px-4 py-1 text-xs font-bold text-yellow-900">

                      PROCESSING

                    </span>


                  </div>





                  <CardContent className="space-y-6 p-6">


                    {/* FLOW */}

                    <div className="flex items-center gap-3">


                      <Step title="Claimed" active />


                      <ArrowRight className="text-slate-300" />


                      <Step title="Chat" active />


                      <ArrowRight className="text-slate-300" />


                      <Step title="Return" />


                    </div>





                    <div className="grid gap-4">


                      <Data
                        icon={<User size={18} />}
                        title="Owner"
                        value={claim.ownerEmail}
                      />


                      <Data
                        icon={<User size={18} />}
                        title="Claimed By"
                        value={claim.claimerEmail}
                      />


                      <Data
                        icon={<Clock size={18} />}
                        title="Created"
                        value={
                          new Date(
                            claim.claimedAt
                          ).toLocaleString()
                        }
                      />


                    </div>





                    <Button
                      asChild
                      className="h-12 w-full bg-orange-500 text-base font-semibold hover:bg-orange-600"
                    >

                      <Link
                        to={`/chat/${claim.chatRoomId}`}
                        state={{
                          ownerEmail: claim.ownerEmail,
                          claimerEmail: claim.claimerEmail
                        }}
                      >

                        <MessageCircle className="mr-2" />

                        Continue Secure Chat

                      </Link>


                    </Button>



                  </CardContent>


                </Card>


              ))
            }


          </div>


        )}


    </div>

  );

};




const Data = ({
  icon,
  title,
  value
}: any) => (

  <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">

    <div className="text-orange-500">
      {icon}
    </div>

    <div>

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="font-semibold text-slate-800">
        {value}
      </p>

    </div>

  </div>

);



const Step = ({
  title,
  active
}: {
  title: string;
  active?: boolean;
}) => (

  <div className={`rounded-full px-3 py-1 text-xs font-semibold ${active
      ? "bg-orange-500 text-white"
      : "bg-slate-100 text-slate-500"
    }`}>

    {title}

  </div>

);



export default MyClaims;