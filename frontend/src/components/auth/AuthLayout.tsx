import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Props {
    children: ReactNode;
    formSide?: "left" | "right";
}

const AuthLayout = ({
    children,
    formSide = "right",
}: Props) => {

    const navigate = useNavigate();


    const infoSection = (
        <div
            className="
      hidden
      w-1/2
      items-center
      justify-center
      bg-gradient-to-br
      from-orange-500
      to-orange-600
      px-10
      md:flex
    "
        >
            <div className="max-w-md text-white">

                <h1 className="text-5xl font-extrabold">
                    Return
                    <span className="text-yellow-200">
                        X
                    </span>
                </h1>


                <h2 className="mt-5 text-3xl font-bold leading-tight">
                    Lost something?
                    <br />
                    Find it with ReturnX.
                </h2>


                <p className="mt-4 leading-relaxed text-orange-100">
                    ReturnX helps people report lost items,
                    discover found belongings and reconnect
                    items with their rightful owners.
                </p>


                <div className="mt-7 space-y-3 text-orange-100">
                    <p>✓ Report lost items easily</p>
                    <p>✓ Search found items quickly</p>
                    <p>✓ Connect with genuine users</p>
                </div>

            </div>
        </div>
    );


    const formSection = (
        <div
            className="
      flex
      w-full
      items-center
      justify-center
      bg-white
      p-5
      md:w-1/2
    "
        >
            {children}
        </div>
    );


    return (

        <div className="relative min-h-screen bg-slate-100">


           {/* Back Button */}
<button
  onClick={() => navigate("/")}
  className="
    absolute
    right-3
    top-2
    z-50
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-full
    bg-orange-500
    text-white
    shadow-md
    transition
    hover:bg-orange-600
    cursor-pointer
  "
>
  <ArrowLeft size={20} />
</button>



            <div
                className="
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        p-4
      "
            >


                <div
                    className="
          flex
          h-[85vh]
          w-full
          max-w-6xl
          translate-y-4
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
        "
                >

                    {
                        formSide === "left"
                            ?
                            <>
                                {formSection}
                                {infoSection}
                            </>
                            :
                            <>
                                {infoSection}
                                {formSection}
                            </>
                    }

                </div>


            </div>


        </div>

    );
};


export default AuthLayout;