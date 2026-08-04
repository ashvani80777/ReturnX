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
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser, getMyProfile } from "@/services/userService";

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userRes, profileRes] = await Promise.all([
          getCurrentUser(),
          getMyProfile(),
        ]);
        setAuthUser(userRes);
        setProfile(profileRes);
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
    { icon: "📦", label: "Items Reported", value: "12" },
    { icon: "🤝", label: "Returned", value: "8" },
    { icon: "💬", label: "Active Claims", value: "2" },
    { icon: "🏆", label: "Karma Points", value: "520" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Welcome,{" "}
            <span className="text-orange-500">
              {profile?.firstName || "User"}
            </span>{" "}
            👋
          </h1>
          <p className="mt-3 text-slate-600">
            Manage your lost items, claims, and recovery activities from one place.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-10 grid gap-6 md:grid-cols-4">
          {actions.map((act) => (
            <Link key={act.title} to={act.link}>
              <Card className="group cursor-pointer transition hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
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
            <Card key={stat.label}>
              <CardContent className="p-6 text-center">
                <div className="text-3xl">{stat.icon}</div>
                <h2 className="mt-3 text-3xl font-bold text-orange-500">
                  {stat.value}
                </h2>
                <p className="text-slate-500">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Profile & Karma Section */}
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-8">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
                <UserRound className="text-orange-500" /> Profile Overview
              </h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500">Name</p>
                  <p className="font-semibold text-slate-800">
                    {profile?.firstName || profile?.lastName
                      ? `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim()
                      : "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-semibold text-slate-800">
                    {authUser?.email || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Department</p>
                  <p className="font-semibold text-slate-800">
                    {profile?.department || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Designation</p>
                  <p className="font-semibold text-slate-800">
                    {profile?.designation || "-"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-8">
              <Trophy size={40} />
              <h2 className="mt-5 text-3xl font-bold">520</h2>
              <p className="text-orange-100">Karma Points</p>
              <div className="mt-6 flex items-center gap-2 font-medium text-orange-100">
                <ShieldCheck size={20} /> Trusted Helper
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;