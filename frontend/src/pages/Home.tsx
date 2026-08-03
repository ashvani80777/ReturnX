import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import CategorySection from "@/components/home/CategorySection";
import { Button } from "@/components/ui/button";
import { getFoundItems, getLostItems } from "@/services/itemService";
import type { Item } from "@/types/item";

const Home = () => {

    const [lost, setLost] = useState<Item[]>([]);
    const [found, setFound] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [lostData, foundData] = await Promise.all([
                    getLostItems(),
                    getFoundItems()
                ]);

                setLost(lostData.slice(0, 4));
                setFound(foundData.slice(0, 4));

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);


    if (loading)
        return (
            <>
                <Navbar />
                <div className="flex h-[70vh] items-center justify-center text-xl">
                    Loading items...
                </div>
            </>
        );


    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-50">

                <section className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-20 text-white">
                    <div className="mx-auto max-w-7xl">

                        <h1 className="text-5xl font-bold">
                            Lost Something?
                            <br />
                            Find It With <span className="text-yellow-200">ReturnX</span>
                        </h1>

                        <p className="mt-5 max-w-xl text-lg text-orange-100">
                            A smart platform to report lost items and reconnect them with their owners.
                        </p>

                        <div className="mt-8 flex gap-4">

                            <Button
                                asChild
                                className="bg-white text-orange-600 hover:bg-slate-100"
                            >
                                <Link to="/items/create-lost">
                                    Report Lost
                                </Link>
                            </Button>

                            <Button
                                asChild
                                className="border border-white bg-transparent text-white hover:bg-white hover:text-orange-600"
                            >
                                <Link to="/items/create-found">
                                    Report Found
                                </Link>
                            </Button>

                        </div>

                    </div>
                </section>


                <main className="mx-auto max-w-7xl space-y-12 px-6 py-12">


                    <section>

                        <div className="mb-5 flex items-center justify-between">

                            <h2 className="text-3xl font-bold text-slate-800">
                                Recently Lost Items
                            </h2>

                            <Link
                                to="/lost-items"
                                className="font-semibold text-orange-500 hover:text-orange-600"
                            >
                                View All →
                            </Link>

                        </div>

                        <CategorySection items={lost} />

                    </section>



                    <section>

                        <div className="mb-5 flex items-center justify-between">

                            <h2 className="text-3xl font-bold text-slate-800">
                                Recently Found Items
                            </h2>

                            <Link
                                to="/found-items"
                                className="font-semibold text-orange-500 hover:text-orange-600"
                            >
                                View All →
                            </Link>

                        </div>

                        <CategorySection items={found} />

                    </section>


                </main>

            </div>
        </>
    );
};

export default Home;