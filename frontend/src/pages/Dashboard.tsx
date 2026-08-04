import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Search,
  PlusCircle,
  MessageCircle,
  Trophy,
  UserRound,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser, getMyProfile } from "@/services/userService";
import { getMyItems } from "@/services/itemService";
import { getMyClaims } from "@/services/claimService";
import { getMyRewardSummary } from "@/services/rewardService";

interface AuthUser {
  email?: string;
}

interface UserProfile {
  firstName?: string;
  lastName?: string;
  department?: string;
  designation?: string;
}

const Dashboard = () => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Dynamic stats state
  const [statsData, setStatsData] = useState({
    reported: 0,
    returned: 0,
    activeClaims: 0,
    karma: 0,
    badge: "Helper",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Fetch all microservice APIs concurrently
        const [userRes, profileRes, itemsRes, claimsRes, rewardRes] =
          await Promise.allSettled([
            getCurrentUser(),
            getMyProfile(),
            getMyItems(),
            getMyClaims(),
            getMyRewardSummary(),
          ]);

        // Safely extract data from Promise results
        const items = itemsRes.status === "fulfilled" ? itemsRes.value : [];
        const claims = claimsRes.status === "fulfilled" ? claimsRes.value : [];
        const rewards =
          rewardRes.status === "fulfilled"
            ? rewardRes.value
            : { totalPoints: 0, badge: "Helper" };

        const totalReported = items.length;
        const totalReturned = items.filter(
          (item: any) => item.status === "RETURNED"
        ).length;
        const totalActiveClaims = claims.filter(
          (claim: any) => claim.status !== "RETURNED"
        ).length;

        if (userRes.status === "fulfilled") setAuthUser(userRes.value);
        if (profileRes.status === "fulfilled") setProfile(profileRes.value);

        setStatsData({
          reported: totalReported,
          returned: totalReturned,
          activeClaims: totalActiveClaims,
          karma: rewards.totalPoints || 0,
          badge: rewards.badge || "Trusted Helper",
        });
      } catch (e) {
        console.error("Error loading dashboard data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-slate-600">
        Loading Dashboard...
      </div>
    );
  }

  const actions = [
    { title: "Report Lost", icon: <Package />, link: "/items/create-lost" },
    { title: "Report Found", icon: <PlusCircle />, link: "/items/create-found" },
    { title: "Search Items", icon: <Search />, link: "/found-items" },
    { title: "My Claims", icon: <MessageCircle />, link: "/claims" },
  ];

  const stats = [
    { icon: "📦", label: "Items Reported", value: statsData.reported },
    { icon: "🤝", label: "Returned", value: statsData.returned },
    { icon: "💬", label: "Active Claims", value: statsData.activeClaims },
    { icon: "🏆", label: "Karma Points", value: statsData.karma },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50/80 px-6 py-10">
      {/* 🌟 BACKGROUND DECORATIVE GLOW & TECH GRID PATTERN */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Glowing Radial Ambient Orbs */}
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-orange-400/20 via-amber-300/15 to-transparent blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-orange-500/15 via-orange-300/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-amber-400/15 via-orange-400/10 to-transparent blur-3xl" />

        {/* Subtle Modern Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">
              Welcome,{" "}
              <span className="text-orange-500">
                {profile?.firstName || "User"}
              </span>{" "}
              👋
            </h1>
            <p className="mt-2 text-slate-600">
              Manage your lost items, claims, and recovery activities from one place.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-semibold text-slate-700">
              Status: <span className="text-orange-600">{statsData.badge}</span>
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-10 grid gap-6 md:grid-cols-4">
          {actions.map((act) => (
            <Link key={act.title} to={act.link}>
              <Card className="group cursor-pointer border-slate-200/80 bg-white/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-500 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                    {act.icon}
                  </div>
                  <h3 className="mt-4 font-bold text-slate-800">{act.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="mb-10 grid gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl">{stat.icon}</div>
                <h2 className="mt-3 text-3xl font-extrabold text-orange-500">
                  {stat.value}
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Profile & Karma Section */}
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm lg:col-span-2">
            <CardContent className="p-8">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
                <UserRound className="text-orange-500" /> Profile Overview
              </h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">Name</p>
                  <p className="mt-1 font-bold text-slate-800">
                    {profile?.firstName || profile?.lastName
                      ? `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim()
                      : "-"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">Email</p>
                  <p className="mt-1 font-bold text-slate-800">
                    {authUser?.email || "-"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">Department</p>
                  <p className="mt-1 font-bold text-slate-800">
                    {profile?.department || "-"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">Designation</p>
                  <p className="mt-1 font-bold text-slate-800">
                    {profile?.designation || "-"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Karma Points & Badge Card */}
          <Card className="relative overflow-hidden border-none bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white shadow-xl">
            {/* Inner Glow Decorative Ring */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-xl" />

            <CardContent className="relative z-10 p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                <Trophy size={32} className="text-amber-300" />
              </div>
              <h2 className="mt-6 text-4xl font-black">{statsData.karma}</h2>
              <p className="text-orange-100">Total Karma Points Earned</p>

              <div className="mt-8 flex items-center gap-2.5 rounded-xl bg-white/10 px-4 py-3 font-semibold text-orange-50 backdrop-blur-md">
                <ShieldCheck size={22} className="text-amber-300" />
                <span>Badge: {statsData.badge}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;